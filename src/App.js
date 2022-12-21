import {useEffect, useState} from "react";
import {storage} from "./Firebase";
import {ref,uploadBytes,listAll,getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';

function App() {
    const [uploadImage,setUploadImage] = useState(null);
    const [imageList,setImageList] = useState([]);
    const imageListRef = ref(storage,'images/');
    const handleUpload = ()=>{
        if(uploadImage === null){
            return;
        }
        const imageRef = ref(storage,`images/${v4() + uploadImage.name}`);
        uploadBytes(imageRef,uploadImage).then((snapshot)=>{
            getDownloadURL(snapshot.ref).then((url)=>{
                setImageList(prev=>[...prev,url]);
            })

            alert('image Uploaded')

        })
    }

    useEffect(()=>{
        listAll(imageListRef).then((res)=>{
            console.log(res);
            res.items.forEach((item)=>{

                getDownloadURL(item).then((url)=>{
                    let addImg = true;
                        imageList.forEach((img)=>{
                            if(img === url){
                                addImg = false;
                                console.log({addImg})
                                return
                            }
                        })
                    if(addImg){
                        setImageList((prev)=>[...prev,url]);
                    }
                })
            })
        });
        // eslint-disable-next-line
    },[])
    console.log({imageList});
  return (
    <div className="App">
        <div className='img'><input type='file' onChange={(e)=>setUploadImage(e.target.files[0])}/>
            <button onClick={handleUpload}>Uplaod Image</button>
            {
                imageList.length>0 &&(
                    imageList.map((img)=>(
                        <img key={img} src={img} alt={'main'}/>
                    ))
                )
            }
        </div>

    </div>
  );
}

export default App;
