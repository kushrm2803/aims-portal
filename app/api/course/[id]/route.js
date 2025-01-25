// get all the students who enrolled a course with courseId as params
import { connectDB } from "@/utils/db";
import Course from "@/models/Course";
import Student from "@/models/Student"
import Enrollment from "@/models/Enrollment";

export async function GET(req, { params }) {
    
    try {
    await connectDB();
    const { id } = await params;
    
    const students = await Enrollment.find({ course: courseId })
    .populate({
      path: "student",
      select: "name rollno",  // Selecting only the required fields
    })
    .select("status student");

    console.log(students)
    // const {students} = course
    // const studentEnrolled = await Student.find({ _id: { $in: students } });
    // console.log(studentEnrolled)
    if (!students) {
      return Response.json({ success: false, message: "Course not found" }, { status: 404 });
    }
    return Response.json({ success: true, students });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
