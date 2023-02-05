// import React, { useState, useEffect } from "react";
// import { storage } from "../../Firebase";
// import { ref,listAll, getMetadata } from "firebase/storage";
// import { v4 } from "uuid";

// const imageListRef = ref(storage, `images/`);
// const metaData = [];
// const firebaseListAll = async (req,res)=>{
//     listAll(imageListRef).then((response) => {
//     response.items.map((item) => {
//       getMetadata(item).then((url) => {
//         let add = true;
//         images.forEach((img) => {
//           if (img === url) {
//             add = false;
//             return;
//           }
//         });
//         if (add) {
//           images.push(url);
//         }
//       });
//     });
//   });
// }

