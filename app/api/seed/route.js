import mongoose from "mongoose";
import { connectDB } from "@/utils/db";  // Your DB connection function
import Student from "@/models/Student";  
import { Professor } from "@/models/Professor";
import Admin from "@/models/Admin";
import Batch from "@/models/batch";  // Ensure correct casing

const rollnos  = ["2022csb1079", "2022csb1081", "2022csb1089", "2022csb1107"];
var studentRollNo = 1080
export async function GET(req) {
  try {
    await connectDB();
    await mongoose.connection.db.dropDatabase();

    await Admin.insertMany([
      { name: "Kush Mahajan", email: "2022csb1089+admin@iitrpr.ac.in" },
      { name: "Dhruv Gupta", email: "2022csb1079+admin@iitrpr.ac.in" },
      { name: "Divyansh Verma", email: "2022csb1081+admin@iitrpr.ac.in" },
      { name: "Priyanshu", email: "2022csb1107+admin@iitrpr.ac.in" },
    ]);
    console.log("Default admins added!");

    // Use for...of for async/await support
    for (const myRollNo of rollnos) {
      await Professor.insertMany([
        { name: "Kush Mahajan", email: `${myRollNo}+professor@iitrpr.ac.in` },
        { name: "Dhruv Gupta", email: `${myRollNo}+professor1@iitrpr.ac.in` },
        { name: "Divyansh Verma", email: `${myRollNo}+professor2@iitrpr.ac.in` },
        { name: "Priyanshu", email: `${myRollNo}+professor3@iitrpr.ac.in` },
      ]);
      console.log(`Professors added for roll number ${myRollNo}`);

      const professor = await Professor.findOne({ email: `${myRollNo}+professor@iitrpr.ac.in` });
      if (professor) {
        const newBatch = new Batch({
          batch: "2022",
          branch: "Computer Science and Engineering",
          facultyAdvisor: professor._id,
        });
        await newBatch.save();
        console.log(`Batch added for roll number ${myRollNo}`);

        // Get Batch ID for Students
        const batch = await Batch.findOne({ batch: "2022", branch: "Computer Science and Engineering" });

        await Student.insertMany([
          { name: "Kartikey", email: `${myRollNo}+student@iitrpr.ac.in`, rollNumber: "2022csb"+studentRollNo, batch: batch._id },
          { name: "Nishant", email: `${myRollNo}+student2@iitrpr.ac.in`, rollNumber: "2022csb"+(studentRollNo+1), batch: batch._id },
          { name: "Prashant", email: `${myRollNo}+student3@iitrpr.ac.in`, rollNumber: "2022csb"+(studentRollNo+2), batch: batch._id },
          { name: "Pranav", email: `${myRollNo}+student4@iitrpr.ac.in`, rollNumber: "2022csb"+(studentRollNo+3), batch: batch._id },
        ]);
        studentRollNo+=4;
        console.log(`Students added for roll number ${myRollNo}`);
      } else {
        console.log(`Professor not found for roll number ${myRollNo}, batch not created.`);
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error("Error seeding database:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
