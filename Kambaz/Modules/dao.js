import { v4 as uuidv4 } from "uuid";
import model from "../Courses/model.js";

export default function ModulesDao() {
  async function findModulesForCourse(courseId) {
    const course = await model.findById(courseId);
    return course.modules;
  }
   async function createModule(courseId, module) {
   const newModule = { ...module, _id: uuidv4() };
   const status = await model.updateOne(
     { _id: courseId },
     { $push: { modules: newModule } }
   );
   return newModule;
  }

  async function deleteModule(courseId, moduleId) {
   const status = await model.updateOne(
     { _id: courseId },
     { $pull: { modules: { _id: moduleId } } }
   );
   return status;
  }

  async function updateModule(courseId, moduleId, moduleUpdates) {
    const course = await model.findById(courseId);
    const module = course.modules.id(moduleId);
    Object.assign(module, moduleUpdates);
    course.markModified('modules'); // Add this line
    await course.save();
    return module;
  }
  
 async function createLesson(courseId, moduleId, lesson) {
    const newLesson = { ...lesson, _id: uuidv4() };
    const course = await model.findById(courseId);
    const module = course.modules.id(moduleId);
    
    if (!module) return null;

    module.lessons = [...(module.lessons || []), newLesson];
    course.markModified('modules');
    await course.save();
    return newLesson;
  }

  async function deleteLesson(courseId, moduleId, lessonId) {
    const course = await model.findById(courseId);
    const module = course.modules.id(moduleId);
    
    if (!module) return { error: "Module not found" };

    module.lessons = module.lessons.filter((l) => l._id !== lessonId);
    course.markModified('modules');
    await course.save();
    return { success: true };
  }

  async function updateLesson(courseId, moduleId, lessonId, lessonUpdates) {
    const course = await model.findById(courseId);
    const module = course.modules.id(moduleId);
    
    if (!module) return { error: "Module not found" };

    const lesson = module.lessons.find((l) => l._id === lessonId);
    if (!lesson) return { error: "Lesson not found" };

    Object.assign(lesson, lessonUpdates);
    course.markModified('modules');
    await course.save();
    return lesson;
  }

  async function findLessonById(courseId, moduleId, lessonId) {
  const course = await model.findById(courseId);
  if (!course) return null;
  
  const module = course.modules.id(moduleId);
  if (!module) return null;
  
  const lesson = module.lessons.find((l) => l._id === lessonId);
  return lesson || null;
}

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
    createLesson,
    deleteLesson,
    updateLesson,
    findLessonById,
  };
}