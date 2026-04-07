import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    }catch(error){
        console.error('MongoDB connection failed:', error.message);
        process.exit;
    }

}
connectDB();

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    speciality: { type: String, required: true },
    experience: { type: Number, required: true },
    fees: { type: Number, required: true },
    rating: { type: Number, required: true },
    gender: { type: String, required: true },
    availableToday: { type: Boolean, default: false }, 
});

const Doctor = mongoose.model('Doctor',doctorSchema);


app.post('/api/doctors/add-doctor', async(req,res) => {
    try{
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).json({message: 'Doctor added successfully',doctor});
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

app.get('/api/doctors/list-doctor-with-filter', async (req, res) => {
    try {
        const { gender, availableToday, feesMin, feesMax, page = 1, limit = 10 } = req.query;
        const query = {};

        if (gender) query.gender = gender;
        if (availableToday) query.availableToday = availableToday === 'true';
        if (feesMin || feesMax) query.fees = {};
        if (feesMin) query.fees.$gte = Number(feesMin);
        if (feesMax) query.fees.$lte = Number(feesMax);

        const doctors = await Doctor.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Doctor.countDocuments(query);

        res.json({
            total,
            page: Number(page),
            limit: Number(limit),
            doctors
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));