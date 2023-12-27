// import { Button, TextField } from '@material-ui/core'
// import React,{useState} from 'react'
// import firebase from 'firebase/compat/app'
// import 'firebase/compat/storage'
// import 'firebase/compat/firestore'
// import { storage,db } from '../firebase'   //storage is used to store the images and db is used to store Captions and Comments
// import Posts from './Posts'


// const AddPost = ({nameUser})=> {

//     const [progress, setProgress] = useState(0)
//     const [image, setImage] = useState(null)
//     const [caption, setCaption] = useState('')


//     const handelChange = (e)=> {
//         // e.preventDefault()
//         if(e.target.files[0]){                //Here e.target.file is array with [image, name, link...]
//             setImage(e.target.files[0])        //We are accessing only image not is further propertise
//         }
//     }

//     const handelUpload = (e)=>{
//         // e.preventDefault()
//         const uploadTask = storage.ref(`images/${image.name}`).put(image);

//         uploadTask.on(
//             "state_changed",
//             (snapshot)=>{
//                 const progress = Math.round(
//                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//                 );
//                 setProgress(progress)
//             },
//             (error) => {
//                 console.log(error)
//                 alert(error.message)
//             },
//             () => {
//                 storage
//                     .ref('images')
//                     .child(image.name)
//                     .getDownloadURL()
//                     .then(url =>{
//                         db.collection('posts').add({
//                             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//                             caption: caption,
//                             imageUrl: url,
//                             userName: nameUser
//                         })
//                     })
//             }
//         )
//         setCaption(' ')
//         setImage(null)
//     }



//   return (
//     <div>

//       <h2>Add new post</h2>

//       <input className='file-input' type='file' onChange={handelChange}/>

//       <TextField id='caption' label='Caption Here' variant='filled'
//         onChange={(e)=>{setCaption(e.target.value)}}
//         value={caption}
//       />

//       <progress className='progress' value={progress} max={100} ></progress>

//       <Button variant='contained' color='primary' onClick={handelUpload}>Add Post</Button>
//       <hr/>

//       {image && <Posts imageArray={image} />}
//     </div>
//   )
// }


// export default AddPost

import React, { useState } from 'react';
import { storage, db } from "../firebase"
import { TextField, Button } from '@material-ui/core'
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import 'firebase/compat/storage';



function AddPost({user}) {
    // const [image, setImage] = useState(null);
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageURL: url,
                            userName: user.displayName
                        })
                    })

            }
        )
        setCaption(' ')
        setImage(null)
    }
    return (
        < div className="imagesupload">


            <h2 style={{ textAlign: 'center', margin: '15px' }}>Add New post</h2>


            <input className='file-input' type="file" onChange={handleChange} />
            <br />
            <TextField id="filled-basic" label="Caption here" variant="filled" onChange={event => setCaption(event.target.value)} value={caption} />
            <br />

            < progress className="progress" value={progress} max="100" />
            <Button variant="contained" color='primary' onClick={handleUpload}>
                ADD POST
            </Button>



        </div>
    )
}

export default AddPost;