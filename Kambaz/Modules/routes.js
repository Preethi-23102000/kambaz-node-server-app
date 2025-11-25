import ModulesDao from "./dao.js";

export default function ModulesRoutes(app) {
  const dao = ModulesDao();
  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesForCourse(courseId);
    res.json(modules);
  };

  const createModuleForCourse = async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await dao.createModule(courseId, module);
    res.send(newModule);
  };

  const deleteModule = async (req, res) => {
    const { courseId,moduleId } = req.params;
    const status = await dao.deleteModule(courseId,moduleId);
    res.send(status);
  };

  const updateModule = async (req, res) => {
    const { courseId, moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await dao.updateModule(courseId, moduleId, moduleUpdates);
    res.send(status);
  };
  
   const createLessonForModule = async (req, res) => {
    const { courseId, moduleId } = req.params;
    const lesson = req.body;
    const newLesson = await dao.createLesson(courseId, moduleId, lesson);
    res.json(newLesson);
  };

  const deleteLesson = async (req, res) => {
    const { courseId, moduleId, lessonId } = req.params;
    const status = await dao.deleteLesson(courseId, moduleId, lessonId);
    res.send(status);
  };

  const updateLesson = async (req, res) => {
    const { courseId, moduleId, lessonId } = req.params;
    const lessonUpdates = req.body;
    const status = await dao.updateLesson(courseId, moduleId, lessonId, lessonUpdates);
    res.send(status);
  };

  const findLessonById = async (req, res) => {
  const { courseId, moduleId, lessonId } = req.params;
  const lesson = await dao.findLessonById(courseId, moduleId, lessonId);
  
  if (!lesson) {
    return res.status(404).json({ error: "Lesson not found" });
  }
  
  res.json(lesson);
};

app.get("/api/courses/:courseId/modules/:moduleId/lessons/:lessonId", findLessonById);


  app.put("/api/courses/:courseId/modules/:moduleId", updateModule);
  app.delete("/api/courses/:courseId/modules/:moduleId", deleteModule);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);

  app.post("/api/courses/:courseId/modules/:moduleId/lessons", createLessonForModule);
  app.delete("/api/courses/:courseId/modules/:moduleId/lessons/:lessonId", deleteLesson);
  app.put("/api/courses/:courseId/modules/:moduleId/lessons/:lessonId", updateLesson);
}