import { connectDB } from "@/utils/db";
import Student from "@/models/Student";
import Course from "@/models/Course"; // Fixed typo "Cousre" to "Course"
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function PATCH(req) {
  try {
    console.log("in enrollment");

    await connectDB();

    // Get the token from cookies
    const token = (await cookies()).get("authToken")?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ error: "authorization token missing" }),
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the role is student
    if (decoded.role !== "student") {
      return new Response(
        JSON.stringify({ error: "Access denied" }),
        { status: 403 }
      );
    }

    // Extract student ID from decoded token
    const studentId = decoded.id;
    console.log("Student ID:", studentId);

    // Extract course ID from the request body
    const { courseId } = await req.json(); // Correct way to extract body in Next.js API route
    
    console.log("Course ID:", courseId);
    
    // Update the student to add the course ID
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $addToSet: { courses: {course: courseId} } },  // Corrected typo in "coures" to "courses"
      { new: true }
    );

    // Update the course to add the student ID
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { students: studentId } },  // Avoid duplicate students
      { new: true }
    );

    if (!updatedStudent || !updatedCourse) {
      return new Response(
        JSON.stringify({ error: "Fuck You!! Failed to enroll student in course" }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        student: updatedStudent,
        course: updatedCourse,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.log("Error enrolling student:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    );
  }
}
