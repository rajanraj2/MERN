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
                <h1>Services we offer</h1>
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
                <div className="container">
                    <h2>Services</h2>
                    <p>
                        We offer a variety of services to our customers. You can
                        upload your cloth image and we will provide you with the
                        best possible design for your cloth.
                    </p>
                    <button type="button" onClick={handleWardrobeClick}>
                        Wardrobe
                    </button>
                </div>
            </div>

            <div className="container">
                <h2>Wardrobe Images</h2>
                {/* <div className="wardrobe-images">
                    {wardrobeImages.map((image, index) => (
                        <img key={index} src={`http://localhost:3060/uploads/${image}`} alt={`Wardrobe Image ${index}`} />
                    ))}
                </div> */}

                <div className="wardrobe-images">
                    {wardrobeImages.map((image, index) => {
                        console.log(`/media/rajan/DATA/Bennett/Learning/Github/MERN/TT_MERN/server/uploads/${image}`); // Log the image filename
                        return (
                            <img
                                key={index}
                                src={`http://localhost:3060/getImages/${image}`}
                                alt={`Wardrobe image ${index + 1}`}
                                width={200}
                                height={200}
                            />
                        );
                    })}
                </div>

            </div>
        </>
    );
};


