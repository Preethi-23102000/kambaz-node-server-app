import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  function findModulesForCourse(courseId) {
    const { modules } = db;
    return modules.filter((module) => module.course === courseId);
  }
  function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    return newModule;
  }

  function deleteModule(moduleId) {
    const { modules } = db;
    db.modules = modules.filter((module) => module._id !== moduleId);
  }
  function updateModule(moduleId, moduleUpdates) {
    const { modules } = db;
    const module = modules.find((module) => module._id === moduleId);
    Object.assign(module, moduleUpdates);
    return module;
  }
  function createLesson(moduleId, lesson) {
    const { modules } = db;
    const module = modules.find((m) => m._id === moduleId);
    if (!module) return null;

    const newLesson = { ...lesson, _id: uuidv4() };
    module.lessons = [...(module.lessons || []), newLesson];
    return newLesson;
  }

  function deleteLesson(moduleId, lessonId) {
    const { modules } = db;
    const module = modules.find((m) => m._id === moduleId);
    if (!module) return { error: "Module not found" };

    module.lessons = module.lessons.filter((l) => l._id !== lessonId);
    return { success: true };
  }

  function updateLesson(moduleId, lessonId, lessonUpdates) {
    const { modules } = db;
    const module = modules.find((m) => m._id === moduleId);
    if (!module) return { error: "Module not found" };

    const lesson = module.lessons.find((l) => l._id === lessonId);
    if (!lesson) return { error: "Lesson not found" };

    Object.assign(lesson, lessonUpdates);
    return lesson;
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
    createLesson,
    deleteLesson,
    updateLesson,
  };
}
