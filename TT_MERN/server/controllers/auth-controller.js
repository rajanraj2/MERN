import User from '../models/user-model.js';


const home = async (req, res) => {
    res.send('Hello World using controller');
};

const register = async (req, res) => {
    try {
        // console.log(req.body);
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({email});

        if(userExist) {
            res.status(400).send({msg: "User already exists"});
        }



        const UserCreated = await User.create({username, email, phone, password});

        res.status(201).json({
            message: "Registration successful", 
            token: await UserCreated.generateToken(), 
            userId: UserCreated._id.toString(),
        });
    }
    catch {
        // res.status(400).send({msg : "page not found"},);
        next(error);
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User
        .findOne({email});
        if (!userExist) {
            return res.status(400).json({message: "Invalid Credentials"}).send({msg: "User not found"});
        }
        // const isMatch = await bycrypt.compare(password, userExist.password);
        const isMatch = await userExist.matchPassword(password);
        
        if (isMatch) {
            res.status(200).json({
                msg: "Login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        }
        else {
            res.status(400).json({message: "Invalid email or password :("}); 
        }
    }
    catch {
        res.status(400).send({msg : "page not found"},);
    }
}   



export default home;

export { register, login };
