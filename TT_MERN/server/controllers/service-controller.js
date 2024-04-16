// import Service from "../models/service-model";
import { spawn } from 'child_process';


const services = async (req, res) => {
    try {
        const response = req.body;
        console.log(response);
        console.log(req.file);

        // Send initial response to acknowledge file upload

        // res.status(200).json({msg: "File uploaded successfully"});

        // Retrieve the filename of the uploaded image
        const filename = req.file.filename;
        console.log(`Filename: ${filename}`);

        // Retrieve the path of the uploaded image file
        const imagePath = `D:/GithubWindows/MERN/TT_MERN/server/uploads/${filename}.jpg`;

        // console.log(imagePath);

        // Execute the Python script
        const pythonProcess = spawn('python', ['model3.py', imagePath]);
        // console.log("Python process started");

        // Variable to store prediction result
        let predictionResult = '';
        let finalPredictionResult = '';

        // Capture output from Python script
        pythonProcess.stdout.on('data', (data) => {
            predictionResult += data.toString().trim();
            finalPredictionResult = predictionResult.slice(-7);
            console.log(`Prediction: ${finalPredictionResult}`);
        });

        // Handle errors
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
            // If an error occurs, do not send another response to the client here
            // res.status(500).send('Internal Server Error');
        });

        // When Python process ends
        pythonProcess.on('close', (code) => {
            // Send prediction result to client only once after Python process ends
            res.status(200).json({msg: "File uploaded successfully", prediction: finalPredictionResult });
            console.log(`Image successfully uploaded and recognised.`);
        });
    }
    catch(error) {
        // console.log(`services: ${error}`);
        // res.status(500).send('Internal Server Error');
    }
};



export default services;
