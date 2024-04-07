import { useState } from 'react';
import './img-uploader.styles.css';

const ImgUploader = ({ handleDataFromImgUploader }) => {
    const [file, setFile] = useState();

    const handleChange = (event) => {
        console.log('image changed');
        const selectedFile = event.target.files[0];

        const reader = new FileReader();

        reader.onloadend = () => {
            // Convert the image to a Base64 encoded string
            const base64String = reader.result.split(',')[1];
            setFile(base64String);

            // Pass the Base64 encoded string to the parent component
            handleDataFromImgUploader(base64String);
        };

        reader.readAsDataURL(selectedFile);
    };

    return (
        <div>
            <h2>Add a profile image:</h2>
            <input type='file' onChange={handleChange} />
            {file && <img className='img-preview' src={`data:image/jpeg;base64,${file}`} alt=''/>}
        </div>
    );
};

export default ImgUploader;
