// import Service from "../models/service-model";

const services = async (req, res) => {
    try {
        const response = req.body;
        console.log(response);
        console.log(req.file);
        res.status(200).json({msg: "file uploaded successfully"});



        // const response = await Service.find();

        // if (!response) {
        //     res.status(404).json({msg : "No service found"});
        //     return;
        // }

        // res.status(200).json({msg : response})
    }
    catch(error) {
        console.log(`services: ${error}`)
    }
};

export default services;
