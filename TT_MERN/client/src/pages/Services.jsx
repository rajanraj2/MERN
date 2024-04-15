import React, { useState, useEffect } from "react";

export const Services = () => {
    const [clothImage, setClothImage] = useState(null);

    const [wardrobeImages, setWardrobeImages] = useState([]);

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("clothImage", clothImage);

            const response = await fetch("http://localhost:3060/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                // Handle success if needed
                console.log("Image uploaded successfully!");
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
            const response = await fetch("http://localhost:3060/api/getImages");

            if (response.ok) {
                const data = await response.json();
                setWardrobeImages(data.images);
            } else {
                console.error("Failed to fetch wardrobe images");
            }
        } catch (error) {
            console.error("Error occurred while fetching wardrobe images:", error);
        }
    };

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
                    {wardrobeImages.map((image, index) => {
                        console.log(`/media/rajan/DATA/Bennett/Learning/Github/MERN/TT_MERN/server/uploads/${image}`); // Log the image filename
                        return (
                            <img
                                key={index}
                                src={`http://localhost:3060/getImages/${image}`}
                                alt={`Wardrobe image ${index + 1}`}
                                className="wardrobe-image"
                            />
                        );
                    })}
                </div>

            </div>
        </>
    );
};


