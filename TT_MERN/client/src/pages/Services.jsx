import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";



export const Services = () => {
    const [clothImage, setClothImage] = useState(null);

    const [wardrobeImages, setWardrobeImages] = useState([]);

    // const [userData, setUserData] = useState(true);

    const { user: currentUser } = useAuth();

    const [uploading, setUploading] = useState(false);
    const [showDetectionMessage, setShowDetectionMessage] = useState(false);
    const [showAddingMessage, setShowAddingMessage] = useState(false);

    const [recommendedOutfits, setRecommendedOutfits] = useState([]);


    const handleUpload = async () => {
        try {
            setUploading(true); // Set uploading state to true
            setTimeout(() => {
                setShowDetectionMessage(true);
            }, 1000);
            const formData = new FormData();
            formData.append("clothImage", clothImage);
            // console.log("Current user email :) ", currentUser.email);
            formData.append("email", currentUser.email);

            setShowAddingMessage(true);
            const response = await fetch("http://localhost:3060/api/upload", {
                method: "POST",
                body: formData,
            });

            setUploading(false);
            setShowDetectionMessage(false);
            setShowAddingMessage(false);

            if (response.ok) {
                // Handle success if needed
                console.log("Image uploaded successfully!");
                handleWardrobeClick();
                setShowAddingMessage(false);
            } else {
                // Handle error if needed
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error occurred during image upload:", error);
        }
        finally {
            // Set uploading state to false after 10 seconds
            setUploading(false);
            setShowDetectionMessage(false);
            setShowAddingMessage(false);
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


    const handleRecommend = async (imageName, clothType, extra) => {
        try {
            const ogImageName = imageName;
            const ogClothType = clothType;
            const ogExtra = extra;
            const requestBody = {
                email: currentUser.email,
                imageName: imageName,
                clothType: clothType,
                extra: extra
            };
            const response = await fetch("http://localhost:3060/api/recommend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const recommendedData = await response.json();
                recommendedData.forEach(outfit => {
                    outfit.ogImageName = ogImageName;
                    outfit.ogClothType = ogClothType;
                    outfit.ogExtra = ogExtra;
                });

                console.log("Recommendation sent successfully!");
                setRecommendedOutfits(recommendedData); // Store recommended outfits in state
            } else {
                console.error("Failed to send recommendation");
            }
        } catch (error) {
            console.error("Error occurred while sending recommendation:", error);
        }
    };


    useEffect(() => {
        // Call handleWardrobeClick when the component is first loaded
        handleWardrobeClick();
    }); // Empty dependency array ensures this effect runs only once after the initial render



    return (
        <>

            {/* Render upload progress popup if uploading state is true */}
            {uploading && (
                <div className="upload-popup">
                    <div className="upload-popup-content">
                        <p>Uploading your image...</p>
                        {showDetectionMessage && <p>AI detecting the type of cloth...</p>}
                        {showAddingMessage && <p>Adding cloth to your wardrobe...</p>}
                    </div>
                </div>
            )}


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

            <h3 className="centertext">Recommended Outfit</h3>
            <div className="recommended-outfit">
                
                <br />
                {recommendedOutfits.map((outfit, index) => (
                    <div key={index} className="recommended-outfit-item">
                        {outfit.ogClothType === "T-shirt" ? (
                            <>
                                <img src={`http://localhost:3060/getImages/${outfit.ogImageName}`} alt={`Recommended outfit ${index + 1}`} className="recommended-outfit-image" />
                                <img src={`http://localhost:3060/getImages/${outfit.imageName}`} alt={`Recommended outfit ${index + 1}`} className="recommended-outfit-image" />
                            </>
                        ) : (
                            <>
                                <img src={`http://localhost:3060/getImages/${outfit.imageName}`} alt={`Recommended outfit ${index + 1}`} className="recommended-outfit-image" />
                                <img src={`http://localhost:3060/getImages/${outfit.ogImageName}`} alt={`Recommended outfit ${index + 1}`} className="recommended-outfit-image" />
                            </>
                        )}
                        <div className="recommended-outfit-details">
                            {/* <p className="recommended-outfit-cloth-type">{outfit.clothTypeR}</p> */}
                            {/* <p className="recommended-outfit-extra">{outfit.extraR}</p> */}
                        </div>
                    </div>
                ))}
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
                                <p className="cloth-type">{image.clothType} </p>
                                <br /><br /><br />
                                <div className="button-container">
                                    <button className="recommend-button" onClick={() => handleRecommend(image.imageName, image.clothType, image.extra)}>Recommend</button>
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


