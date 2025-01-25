import mongoose  from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  status: {type: "String", enum: ["Pending Faculty Approval", "Pending Faculty Advisor Approval", "Enrolled", "Dropped", "WithDras"], default : "Pending Faculty Approval"},
  grade: { type: String , default: "NA"},
  semester : { type: Number, default: 1},
});

const Enrollment = mongoose.models.Enrollment || mongoose.model("Enrollment", EnrollmentSchema);
export default Enrollment;
