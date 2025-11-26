import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
     _id: { type: String, required: true },
    title: { type: String, required: true },
    course: { type: String, required: true },
    modules: String,
    availableDateWords: String,
    dueDateWords: String,
    points: Number,
    available: String,
    due: String,
    until: String,
    description: {
      summary: String,
      requirements: [String],
      note: String,
    },
    assignmentGroup: String,
    displayGrade: String,
    submissionType: String,
    assignedTo: String,
  },
  { collection: "assignments" }
);

export default assignmentSchema;