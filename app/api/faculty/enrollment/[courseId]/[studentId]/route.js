import { NextResponse } from "next/server";
import Course from "@/models/Course";
import connectDB from "@/utils/db";


export async function PUT(request) {
    await connectDB();
    try {
      const { courseId, studentId } = request.query;
      const { status } = await request.json();
      const course = await Course.findById(courseId);
      const studentIndex = course.students.findIndex((s) => s.student.toString() === studentId);
      if (studentIndex !== -1) {
        course.students[studentIndex].enrollmentStatus = status;
        await course.save();
        return NextResponse.json({ message: "Enrollment status updated successfully" });
      }
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }