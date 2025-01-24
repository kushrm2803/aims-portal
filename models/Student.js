import mongoose  from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNumber: { type: String, required: true, unique: true },
  profilePic: { type: String },
  courses: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      status: {type: "String", enum: ["Pending Faculty Approval", "Pending Faculty Advisor Approval", "Enrolled", "Dropped", "WithDras"], default : "Pending Faculty Approval"},
      grade: { type: String , default: "NA"},
      semester : { type: Number, default: 1},
      default : {}
    },
  ],
  sgpa: [{ semester: Number, sgpa: Number }],
  cgpa: { type: Number },
  batch : { type: mongoose.Schema.Types.ObjectId, ref: "batch", required: true }
});

const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);
export default Student;
