import { connectDB } from "@/utils/db";
import Student from "@/models/Student";
import Course from "@/models/Course"; // Fixed typo "Cousre" to "Course"
import Enrollment from "@/models/Enrollment";
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
    const newEnrollment = new Enrollment({courseId, studentId});
    newEnrollment.save();

    return new Response(
      JSON.stringify({
        success: true,
        newEnrollment
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
