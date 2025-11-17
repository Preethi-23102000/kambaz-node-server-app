import ModulesDao from "./dao.js";

export default function ModulesRoutes(app, db) {
  const dao = ModulesDao(db);
  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    const modules = dao.findModulesForCourse(courseId);
    res.json(modules);
  };

  const createModuleForCourse = (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = dao.createModule(module);
    res.send(newModule);
  };

  const deleteModule = (req, res) => {
    const { moduleId } = req.params;
    const status = dao.deleteModule(moduleId);
    res.send(status);
  };

  const updateModule = async (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await dao.updateModule(moduleId, moduleUpdates);
    res.send(status);
  };
  const createLessonForModule = (req, res) => {
    const { moduleId } = req.params;
    const lesson = req.body;
    const newLesson = dao.createLesson(moduleId, lesson);
    res.json(newLesson);
  };

  const deleteLesson = (req, res) => {
    const { moduleId, lessonId } = req.params;
    const status = dao.deleteLesson(moduleId, lessonId);
    res.send(status);
  };

  const updateLesson = (req, res) => {
    const { moduleId, lessonId } = req.params;
    const lessonUpdates = req.body;
    const status = dao.updateLesson(moduleId, lessonId, lessonUpdates);
    res.send(status);
  };

  app.put("/api/modules/:moduleId", updateModule);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);

  app.post("/api/modules/:moduleId/lessons", createLessonForModule);
  app.delete("/api/modules/:moduleId/lessons/:lessonId", deleteLesson);
  app.put("/api/modules/:moduleId/lessons/:lessonId", updateLesson);
}
