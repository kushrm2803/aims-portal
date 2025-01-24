import mongoose  from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String, required: true, unique: true },
  profilePic: { type: String },
  courses: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      grade: { type: String },
      semester : { type: Number},
      default : {}
    },
  ],
  sgpa: [{ semester: Number, sgpa: Number }],
  cgpa: { type: Number },
  batch : { type: mongoose.Schema.Types.ObjectId, ref: "batch", required: true }
});

const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);
export default Student;
