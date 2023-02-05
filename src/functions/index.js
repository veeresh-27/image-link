import functions from "firebase-functions";
import admin from "firebase-admin";
import { ref } from 'firebase/storage';
import { storage } from ".";
import { getDownloadURL } from 'firebase/storage';
admin.initializeApp();

export const getImages = functions.https.onRequest((request,response)=>{
    const imageRef = ref(storage,'images/06a26daf-dbfc-4aaa-8f85-9462de4574b4_Screenshot (52).png');
     const url =getDownloadURL(imageRef);
     url.then((url)=>{
        response.send(url);
    }).catch(error=>{
        console.log(error);
        response.status(500).send('Req Failed');
    })
})