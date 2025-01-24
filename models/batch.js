import mongoose from "mongoose"

const BatchSchema = new mongoose.Schema({
    batch : {type: String, required: true},
    branch : {type: String, required: true},
    facultyAdvisor : {type: String}
})

const Batch = mongoose.models.Batch || mongoose.model("Batch", BatchSchema);
export default Batch;