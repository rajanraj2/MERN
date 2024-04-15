import React, { useState } from "react";

export const Services = () => {
    const [clothImage, setClothImage] = useState(null);

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

    return (
        <div>
            <h1>Services we offer</h1>
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
    );
};


