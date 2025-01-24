import mongoose from "mongoose";
import { connectDB } from "@/utils/db";  // Your DB connection function
import Student from "@/models/Student";  
import {Professor} from "@/models/Professor";
import Admin from "@/models/Admin";
import Batch from "@/models/batch"; 

const myRollNo  = process.env.MY_ROLLNO || "2022csb1079";

export async function GET(req){
  try {
    await connectDB();
    // await mongoose.connection.db.dropDatabase();

    //   await Admin.insertMany([
    //     { name: "Kush Mahajan", email: "2022csb1089+admin@iitrpr.ac.in" },
    //     { name: "Dhruv Gupta", email: "2022csb1079+admin@iitrpr.ac.in" },
    //     { name: "Divyansh Verma", email: "2022csb1081+admin@iitrpr.ac.in" },
    //     { name: "Priyanshu", email: "2022csb1107+admin@iitrpr.ac.in" },
    //   ]);
    //   console.log("Default admins added!");

      // Insert Professors
      await Professor.insertMany([
        { name: "Kush Mahajan", email:(myRollNo + "+professor@iitrpr.ac.in") },
        { name: "Dhruv Gupta", email: myRollNo+"+professor1@iitrpr.ac.in" },
        { name: "Divyansh Verma", email: myRollNo+ "+professor2@iitrpr.ac.in" },
        { name: "Priyanshu", email: myRollNo + "+professor3@iitrpr.ac.in" },
      ]);
      console.log("Default professors added!");

      // Get Professor ID for Batch
      const professor = await Professor.findOne({ email: myRollNo + "+professor@iitrpr.ac.in" });
      if (professor) {
        const newBatch = new Batch({
          batch: "2022",
          branch: "Computer Science and Engineering",
          facultyAdvisor: professor._id,  // Use _id instead of id
        });
        await newBatch.save();
        console.log("Default batch added!");

        // Get Batch ID for Students
        const batch = await Batch.findOne({ batch: "2022", branch: "Computer Science and Engineering" });

        await Student.insertMany([
          { name: "Kartikey", email: myRollNo + "+student@iitrpr.ac.in", rollNumber: "2022csb1082", batch: batch._id },
          { name: "Nishant", email: myRollNo + "+student2@gmail.com", rollNumber: "2022csb1081", batch: batch._id },
          { name: "Prashant", email: myRollNo + "+student3@iitrpr.ac.in", rollNumber: "2022csb1083", batch: batch._id },
          { name: "Pranav", email: myRollNo + "+student4@iitrpr.ac.in", rollNumber: "2022csb1084", batch: batch._id },
        ]);
        console.log("Default students added!");
        return Response.json({ success: true });
      } else {
        console.log("Professor not found. Batch not created.");
        return Response.json({ success: false });
      }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
