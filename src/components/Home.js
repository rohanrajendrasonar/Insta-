// import React, { useState, useEffect } from 'react'
// import { makeStyles, Button, Modal, Input } from '@material-ui/core'

// // import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'
// import { auth, db, storage } from '../firebase';

// import AddPost from './AddPost';
// import Posts from './Posts';

// function getModalStyle(){
//   return{
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)'
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     border: '2px solid #000',
//     backgroundColor: 'white',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2,4,3)
//   }
// }));


// const Home = ()=> {

//   const classes = useStyles()
//   const [modalStyles] = useState(getModalStyle)

//   const [openSignup, setOpenSignup] = useState(false)
//   const [openSignin, setOpenSignin] = useState(false)

//   const [userName, setUsername] = useState('')
//   const [Email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const [posts, setPosts] = useState([])

//   const [user, setuser] = useState(null) 


//   const signUp = (e) =>{
//     e.preventDefault()   //Cancels the event if it is possible
//                          //Default action belog to event will not occur (Here submitting the form) 
//     auth.createUserWithEmailAndPassword(Email, password)
//       .then((authUser)=> {
//         return authUser.user.updateProfile({
//           displayName: userName
//         })
//       })
//       .catch((e) => alert(e.message))

//       setOpenSignup(false);
//   }

//   const signIn = (e) =>{
//     e.preventDefault()
//     auth.signInWithEmailAndPassword(Email, password)
//     .catch((e) => alert(e.message))

//     setOpenSignin(false);
//   }

//   useEffect(() => {
    
//     const unsubscibe = auth.onAuthStateChanged((authuser)=>{
//       if (authuser){
//         setuser(authuser)
//       }
//       else{
//         setuser(null)
//       }
//     })
  
//     return () => {
//       unsubscibe()
//     }
//   }, [])
  
//   useEffect(()=>{
//     db.collection('posts')
//       .orderBy('timestamp', 'desc')
//       .onSnapshot((snapshot)=>{
//         setPosts(
//           snapshot.docs.map((doc)=>({
//             id: doc.id,
//             post: doc.data
//           }))
//         )
//       })
//   })

//   return (
//     <div className='app'>

//       <Modal open={openSignup} onClose={() => setOpenSignup(false)}>
//         <div style={modalStyles} className={classes.paper}>
//           <form className='app_signup'>
//             <center>
//                 <img 
//                 className='app_headerImage'
//                 src='https://adventuresindbad.com/wp-content/uploads/2018/06/2475.new-instagram-text-logo.png' 
//                 alt='App Logo'
//                 width={'300em'}
//                 height={'100em'}
//               />
//             </center>
            
//             <Input
//               placeholder="Name"
//               type="text"
//               value={userName}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <br></br>
//             <Input
//                 placeholder="email"
//                 type="text"
//                 value={Email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <br></br>
//             <Input
//                 placeholder="Password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             /><br></br>
//             <Button type='submit' onClick={signUp}>Sign Up</Button>
 
//           </form>
//         </div>
//       </Modal>

//       <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
//         <div style={modalStyles} className={classes.paper}>
//           <form className='app_signup'>
//             <center>
//                 <img
//                 className='app_headerImage'
//                 src='https://adventuresindbad.com/wp-content/uploads/2018/06/2475.new-instagram-text-logo.png' 
//                 alt='App Logo'
//                 width={'300em'}
//                 height={'100em'}
//               />
//             </center>
            
//             <Input type='text' placeholder='Email' value={Email}
//                    onChange={(e) => setEmail(e.target.value)} 
//             /><br></br>
//             <Input type='password' placeholder='Password' value={password}
//                    onChange={(e) => setPassword(e.target.value)} 
//             /><br></br>
//             <Button type='submit' onClick={signIn}>Sign In</Button>
//           </form>
//         </div>
//       </Modal>



//       <div className='app_header'>
//         <img 
//             className='app_headerImage'
//             src='https://adventuresindbad.com/wp-content/uploads/2018/06/2475.new-instagram-text-logo.png' 
//             alt='App Logo'
//             width={'500em'}
//             height={'100em'}
//         />
//         <div>
//           {user? 
//             <><Button variant='contained' color='primary' onClick={()=> {auth.signOut()}}>LogOut</Button></>
//             :
//             <>
//               <Button variant='contained' color='primary' onClick={()=> setOpenSignin(true)}>SIGN IN</Button>
//               <span>&nbsp;&nbsp;</span>
//               <Button variant='contained' color='primary' onClick={()=> setOpenSignup(true)}>SIGN Up</Button>
//             </>
//           }
//         </div>
//       </div>

//       {user && user.displayName ? 
//       <> <AddPost nameUser={user.displayName}/>
//       </>:
//       <div className='unauth'>
//         Please<b style={{cursor: 'pointer', color: 'blue'}} onClick={() => {setOpenSignin(true)}}>LogIn</b>/
//         <b style={{cursor: 'pointer', color: 'blue'}} onClick={() => {setOpenSignup(true)}}>Register</b>to add post.
//       </div>}
      
//       <div className='app_posts'>
//         <div className='app_postright'>
//           <br/>
//           {
//             posts.map(({id,post})=>(
//               <Posts
//                 key= {id}
//                 postId= {id}
//                 user= {user}   //Current LogedIn person
//                 userName={post.userName} //Posted person
//                 caption={post.caption}
//                 imageUrl={post.imageUrl}
//               />
//             ))
//           }
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Home

import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";

import { db, auth } from "../firebase";
import 'firebase/compat/auth';
import Posts from './Posts';
import AddPost from './AddPost';
// import { Edit } from '@material-ui/icons';


function getModalStyle() {
    return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const Home = () => {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = useState(false);
    const [openSignin, setOpensignin] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user, setUser] = useState(null);

    const [posts, setposts] = useState([]);


    const signUp = (event) => {
        event.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                });
            })
            .catch((error) => alert(error.message));

        setOpen(false);
        // window.location.reload(false);
    };

    const signIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));

        setOpensignin(false);
        // window.location.reload(false);
    };


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [user, username]);

    useEffect(() => {
        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setposts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data(),
                    }))
                );
            });
    }, []);

    return (
        <div className="app">
            <Modal open={open} onClose={() => setOpen(false)}>
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__signup">
                        <center>
                            <img
                                className="app__headerImage"
                                src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
                                alt=""
                                width={'180'}
                                height={'60'}
                            />
                        </center>
                        <br></br>
                        <Input
                            placeholder="Name"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br></br>
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br></br>
                        <Input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br></br>
                        <Button type="submit" onClick={signUp}>
                            Sign Up
                        </Button>
                    </form>
                </div>
            </Modal>

            <Modal open={openSignin} onClose={() => setOpensignin(false)}>
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__signup">
                        <center>
                            <img
                                className="app__headerImage"
                                src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
                                alt=""
                                width={'180'}
                                height={'60'}
                            />
                        </center>
                        <br></br>
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br></br>
                        <Input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br></br>
                        <Button type="submit" onClick={signIn}>
                            Sign In
                        </Button>
                    </form>
                </div>
            </Modal>

            <div className="app__header">
                <img
                    className="app__headerImage"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/06/%C4%B0nstagram-Profilime-Kim-Bakt%C4%B1-1.png"
                    alt=""
                    width={'180'}
                    height={'60'}
                />
                {user ? (
                    <Button variant="contained" color='primary' onClick={() => auth.signOut()}>Logout</Button>
                ) : (
                    <div>
                        <Button variant="contained" color='primary' disableElevation onClick={() => setOpensignin(true)}>Sign In</Button>
                        <span>&nbsp;</span>
                        <Button variant="contained" color='primary' disableElevation onClick={() => setOpen(true)}>Sign Up</Button>
                    </div>
                )}
            </div>



            {user  ? (
                <>
                    {/* <h2 style={{ textAlign: ' center' }}>userid: {user.displayName}</h2> */}
                    <AddPost user= {user} />
                </>
            ) : (
                <div className='unauth'>
                    Please <b onClick={() => setOpensignin(true)} style={{ cursor: 'pointer', color: 'Blue' }}>Login</b>/<b onClick={() => setOpen(true)} style={{ cursor: 'pointer', color: 'Blue' }}>Register</b> to Add New Post
                </div>
            )}

            <div className="app__posts">
                <div className="app__postright">

                    {/* {user && user.displayName && <h2 style={{ textAlign: ' center' }}>userid: {user.displayName}</h2>} */}
                    <br />
                    {posts.map(({ id, post }) => (
                        <Posts
                            key={id}
                            postId={id}
                            user={user}
                            userName={post.userName}
                            caption={post.caption}
                            imageURL={post.imageURL}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home