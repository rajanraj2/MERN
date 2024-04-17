import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";


export const Services = () => {
    const [clothImage, setClothImage] = useState(null);

    const [wardrobeImages, setWardrobeImages] = useState([]);

    // const [userData, setUserData] = useState(true);

    const { user: currentUser } = useAuth();
    

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("clothImage", clothImage);
            // console.log("Current user email :) ", currentUser.email);
            formData.append("email", currentUser.email);

            const response = await fetch("http://localhost:3060/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                // Handle success if needed
                console.log("Image uploaded successfully!");
                handleWardrobeClick();
            } else {
                // Handle error if needed
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error occurred during image upload:", error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setClothImage(file);
    };




    const handleWardrobeClick = async () => {
        try {
            // Include the current user's email in the request body
            const requestBody = {
                email: currentUser.email
            };

            const response = await fetch("http://localhost:3060/api/getImages", {
                method: "POST", // Change the method to POST
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody) // Convert the request body to JSON
            });

            if (response.ok) {
                const data = await response.json();
                const reversedImages = data.images.reverse();
                setWardrobeImages(reversedImages);
            } else {
                console.error("Failed to fetch wardrobe images");
            }
        } catch (error) {
            console.error("Error occurred while fetching wardrobe images:", error);
        }
    };


    useEffect(() => {
        // Call handleWardrobeClick when the component is first loaded
        handleWardrobeClick();
    }); // Empty dependency array ensures this effect runs only once after the initial render



    return (
        <>
            <div className="Outer-box">
                <h1 className="services-heading"> Manage your wardrobe</h1>
                <div className="bigbox">
                    <h2 className="services-heading">Add cloth to wardrobe</h2>
                    <div className="container imageUpload">
                        <form>
                            <input
                                type="file"
                                name="clothImage"
                                onChange={handleImageChange}
                            />
                            <button type="button" onClick={handleUpload}>
                                Upload
                            </button>
                        </form>
                    </div>
                </div>


                <div className="bigbox">

                    <h2 className="services-heading">Services</h2>
                    <div className="container services-container">

                        <p>
                            We offer a variety of services to our customers. You can
                            upload your cloth in the digital wardrobe and see how it
                            looks on you. You can also view the wardrobe images.
                        </p>
                        <section>
                            <button type="button" onClick={handleWardrobeClick} className="wardrobe-btn">
                                Wardrobe
                            </button>
                            <p className="service-heading">|   Click to see   |</p>
                        </section>
                    </div>
                </div>
            </div>

            <h2 className="centertext">Wardrobe Images</h2>
            <div className="container">

                {/* <div className="wardrobe-images">
                    {wardrobeImages.map((image, index) => (
                        <img key={index} src={`http://localhost:3060/uploads/${image}`} alt={`Wardrobe Image ${index}`} />
                    ))}
                </div> */}

                <div className="wardrobe-images-container">
                    
                    {wardrobeImages.map((image, index) => (
                        <div key={index} className="wardrobe-image-container">

                            <img
                                src={`http://localhost:3060/getImages/${image.imageName}`}
                                alt={`Wardrobe image ${index + 1}`}
                                className="wardrobe-image"
                            />
                            <div className="image-info">
                                <p className="cloth-type">{image.clothType}</p>
                                <br/><br/><br/>
                                <div className="button-container">
                                    <button className="recommend-button">Recommend</button>
                                    <button className="delete-button">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </>
    );
};


