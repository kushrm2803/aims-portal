import { connectDB } from "@/utils/db";
import Enrollment from "@/models/Enrollment";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return new Response(JSON.stringify({ error: "Login erro" }), { status: 400 });
    }

    // Find enrollments and populate course details including semester
    const enrollments = await Enrollment.find({ student: id }).populate("course");

    if (!enrollments || enrollments.length === 0) {
      return new Response(JSON.stringify({ error: "No courses found for this student" }), { status: 404 });
    }

    // Group courses by semester
    const coursesBySemester = {};
    enrollments.forEach((enrollment) => {
      const semester = enrollment.course.semester || 1; // Default to semester 1 if not defined
      if (!coursesBySemester[semester]) {
        coursesBySemester[semester] = [];
      }
      coursesBySemester[semester].push(enrollment.course);
    });

    // Convert grouped courses to an array based on semester order
    const sortedSemesters = Object.keys(coursesBySemester)
      .sort((a, b) => a - b)
      .map((semester) => coursesBySemester[semester]);

    return new Response(
      JSON.stringify({ success: true, courses: sortedSemesters }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching student courses:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
