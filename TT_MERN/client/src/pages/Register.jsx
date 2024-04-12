import { useState } from "react";
import {useNavigate} from "react-router-dom";

export const Register = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        // console.log(e);      
        const name = e.target.name;
        const value = e.target.value;

        setUser({...user, [name]: value});
    } 

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        alert("Form submitted");

        try {
            const response = await fetch("http://localhost:3060/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
        }
        catch (err) {
            console.log("register",err);
        }

        
        if (response.ok === true) {
            alert("Registration successful");
            setUser({username: "", email: "", phone: "", password: ""});
            navigate("/login");
        }
        else {
            alert("Registration failed");
        }

    console.log(response);
    }

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div class="registration-image"> 
                                <img src="images/register.png" alt="Registration" width="500" height="500"/>
                            </div>

                            {/* Registratoin form */}

                            <div className="registration-form">
                                <h1 className="main-heading">Registration form</h1>
                                <br/>

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">username</label>
                                        <input 
                                        type="text" 
                                        name="username"
                                        placeholder="Enter username"
                                        id="username"
                                        required
                                        autoComplete="off"
                                        value={user.username}
                                        onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input 
                                        type="email" 
                                        name="email"
                                        placeholder="Enter email"
                                        id="email"
                                        required
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone">phone</label>
                                        <input 
                                        type="number" 
                                        name="phone"
                                        placeholder="Enter phone number"
                                        id="phone"
                                        required
                                        autoComplete="off"
                                        value={user.phone}
                                        onChange={handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password">password</label>
                                        <input 
                                        type="password" 
                                        name="password"
                                        placeholder="Enter password"
                                        id="password"
                                        required
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={handleInput}
                                        />
                                    </div>


                                    <br />

                                    <button type="submit" className="btn btn-submit">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
}