// import { useState } from "react";
import { useAuth } from "../store/auth";

export const About = () => {

    // const [userData, setUserData] = useState(true);

    const { user: currentUser } = useAuth();


    return (
        <div>
        <h1>About Page</h1>
        <br/>
        <h3>Welcome { currentUser ? `${currentUser.username} to our website` : `to our website`
        }</h3>
        </div>
    );
    }

// export default About;