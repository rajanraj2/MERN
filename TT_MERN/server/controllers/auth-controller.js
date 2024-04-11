const home = async (req, res) => {
    res.send('Hello World using controller');
};

const register = async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({message: req.body});
    }
    catch {
        res.status(400).send({msg : "page not found"});
    }
};

export default home;

export { register };
