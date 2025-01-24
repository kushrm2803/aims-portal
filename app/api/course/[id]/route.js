import { connectDB } from "@/utils/db";
import Course from "@/models/Course";
import Student from "@/models/Student"

export async function GET(req, { params }) {
    
    try {
    await connectDB();
    const { id } = await params;
    const course = await Course.findById(id).populate("students", "");
    // const {students} = course
    // const studentEnrolled = await Student.find({ _id: { $in: students } });
    // console.log(studentEnrolled)
    if (!course) {
      return Response.json({ success: false, message: "Course not found" }, { status: 404 });
    }
    return Response.json({ success: true, course });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
