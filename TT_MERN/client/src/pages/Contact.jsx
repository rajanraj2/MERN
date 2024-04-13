import { useState } from "react";
import { useAuth } from "../store/auth";

export const Contact = () => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        message: "",
    });

    const [userData, setUserData] = useState(true);

    const { user: currentUser } = useAuth();

    if (userData && currentUser) {
        setUser({
            username: currentUser.username,
            email: currentUser.email,
            message: "",
        });
        setUserData(false);
    }

    const handleInput = (e) => {
        // console.log(e);      
        const name = e.target.name;
        const value = e.target.value;

        setUser({...user, [name]: value});
    } 

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        alert("Message sent successfully.");
    }

    return (
        <>
            <section>
                <main>
                    <div className="section-contact">
                        <div className="contact-content container">
                            <h1 className="main-heading">Contact us</h1>
                        </div>
                        <div className="container grid grid-two-cols">
                            <div class="contact-image"> 
                                <img src="images/FashionFusion.png" alt="Contact" width="500" height="500"/>
                            </div>

                            {/* Contact form */}
                            <section className="section-form">

                            <div className="contact-form">
                                

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
                                        <label htmlFor="message">message</label>
                                        <textarea 
                                        name="message"
                                        id="message"
                                        cols="30"
                                        rows="10"
                                        required
                                        value={user.message}
                                        onChange={handleInput}
                                        />
                                    </div>


                                    <br />

                                    <button type="submit" className="btn btn-submit">Send</button>
                                </form>
                            </div>
                            </section>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
}