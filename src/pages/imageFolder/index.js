import { useParams } from "react-router-dom";

export default function ImageFolder() {
    const  folderName  = useParams();
    console.log(folderName)
    return (
        <div>
        <h1>Image Folder Page</h1>
        </div>
    );
}