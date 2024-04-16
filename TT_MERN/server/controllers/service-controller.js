// import Service from "../models/service-model";
import { spawn } from 'child_process';

// const services = async (req, res) => {
//     try {
//         const response = req.body;
//         console.log(response);
//         console.log(req.file);
//         res.status(200).json({msg: "file uploaded successfully"});


//         // // Retrieve the path of the uploaded image file
//         // const imagePath = "uploads/1713207603672-8.jpg";
//         // console.log(imagePath);

//         // // Execute the Python script
//         // const pythonProcess = spawn('python', ['model.py', imagePath]);
//         // console.log("python process started");

//         // // Capture output from Python script
//         // pythonProcess.stdout.on('data', (data) => {
//         //     const prediction = data.toString().trim();
//         //     res.status(200).json({ prediction });
//         //     console.log(`Prediction: ${prediction}`);
//         // });

//         // // Handle errors
//         // pythonProcess.stderr.on('data', (data) => {
//         //     console.error(`Error: ${data}`);
//         //     res.status(500).send('Internal Server Error');
//         // });



//         try {
//             // Retrieve the path of the uploaded image file
//             // const imagePath = req.file.path;
//             const imagePath = "uploads/1713207603672-8.jpg"
//             console.log(imagePath);
    
//             // Execute the Python script
//             const pythonProcess = spawn('python', ['model.py', imagePath]);
//             console.log("python process started");
    
//             // Capture output from Python script
//             pythonProcess.stdout.on('data', (data) => {
//                 const prediction = data.toString().trim();
//                 res.status(200).json({ prediction });
//                 console.log(`Prediction: ${prediction}`);
//             });
    
//             // Handle errors
//             pythonProcess.stderr.on('data', (data) => {
//                 console.error(`Error: ${data}`);
//                 res.status(500).send('Internal Server Error');
//             });
//         }
//         catch (error) {
//             console.log(`Error: ${error}`);
//             res.status(500).send('Internal Server Error');
//         }



//         // const response = await Service.find();

//         // if (!response) {
//         //     res.status(404).json({msg : "No service found"});
//         //     return;
//         // }

//         // res.status(200).json({msg : response})
//     }
//     catch(error) {
//         console.log(`services: ${error}`)
//     }
// };





const services = async (req, res) => {
    try {
        const response = req.body;
        console.log(response);
        console.log(req.file);

        // Send initial response to acknowledge file upload

        // res.status(200).json({msg: "File uploaded successfully"});

        // Retrieve the path of the uploaded image file
        const imagePath = "uploads/1713207603672-8.jpg";
        console.log(imagePath);

        // Execute the Python script
        const pythonProcess = spawn('python', ['model.py', imagePath]);
        console.log("Python process started");

        // Variable to store prediction result
        let predictionResult = '';

        // Capture output from Python script
        pythonProcess.stdout.on('data', (data) => {
            predictionResult += data.toString().trim();
            console.log(`Prediction: ${predictionResult}`);
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
            res.status(200).json({msg: "File uploaded successfully", prediction: predictionResult });
        });
    }
    catch(error) {
        // console.log(`services: ${error}`);
        // res.status(500).send('Internal Server Error');
    }
};



export default services;
