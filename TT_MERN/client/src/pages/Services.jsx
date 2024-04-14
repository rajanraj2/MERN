
export const Services = () => {
    return (
        <>
            <div>

                <h1>Services we offer </h1>

                <form action="/upload" method="POST" encType="multipart/form-data">
                    <input type="file" name="clothImage" />
                    <button type="submit">Upload</button>
                </form>

            </div>
        </>
    );
}
