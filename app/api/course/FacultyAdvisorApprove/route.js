import { connectDB } from "@/utils/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Enrollment from "@/models/Enrollment";
import Student from "@/models/Student";

export async function PATCH(req) {
  try {
    await connectDB();

    // Get auth token from cookies
    const token = cookies().get("authToken")?.value;
    if (!token) {
      return new Response(JSON.stringify({ error: "Authorization token missing" }), { status: 401 });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded.role);
    if (decoded.role !== "professor") {
      return new Response(JSON.stringify({ error: "Access denied. Only accessible by professors" }), { status: 403 });
    }

    const body = await req.json();
    const { enrollmentId, courseId, studentId } = body;

    if (!enrollmentId || !courseId || !studentId) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Find the student and verify faculty advisor
    const student = await Student.findById(studentId).populate("batch");

    if (!student) {
      return new Response(JSON.stringify({ error: "Student not found" }), { status: 404 });
    }

    // Check if the professor is the faculty advisor of the student's batch
    if (decoded.id !== student.batch.facultyAdvisor.toString()) {
      console.log("You are not the faculty advisor");
      return new Response(JSON.stringify({ error: "Not authorized to enroll this student" }), { status: 403 });
    }

    const enrollment = await Enrollment.findOne({id: enrollmentId})
    if(enrollment.status!="Pending Faculty Advisor Approval"){
        console.log("either enrolled or not approved by prof");
    }
    

    // Update the enrollment status
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { status: "Enrolled" },
      { new: true } // Return the updated document
    );

    if (!updatedEnrollment) {
      return new Response(JSON.stringify({ error: "Enrollment not found" }), { status: 404 });
    }

    return new Response(
      JSON.stringify({ message: "Enrollment status updated successfully", enrollment: updatedEnrollment }),
      { status: 200 }
    );

  } catch (error) {
    console.log("Error updating enrollment section", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
