import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseCode: { type: String, required: true, unique: true },
  courseCredit: {type: Number, required: true},
  professor: { type: mongoose.Schema.Types.ObjectId, ref: "Professor", required: true }, // Created by Professor
  adminApproval : {type: Boolean, required: true, default: false},
  status: {
    type: String,
    enum: ["pending", "open for enrollment", "in progress", "completed"],
    default: "pending",
  },
}, { timestamps: true });

const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);
export default Course;

