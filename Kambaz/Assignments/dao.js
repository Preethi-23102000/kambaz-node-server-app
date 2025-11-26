import model from "./model.js";

export default function AssignmentsDao() {
  async function findAssignmentsForCourse(courseId) {
  return await model.find({ course: courseId }).lean();
}

  async function findAssignmentById(assignmentId) {
  return await model.findOne({ _id: assignmentId }).lean();
}


  async function createAssignment(assignment) {
    return await model.create(assignment);
  }

  async function deleteAssignment(assignmentId) {
    return await model.deleteOne({ _id: assignmentId });
  }

  async function updateAssignment(assignmentId, assignmentUpdates) {
    return await model.updateOne(
      { _id: assignmentId },
      { $set: assignmentUpdates }
    );
  }

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}