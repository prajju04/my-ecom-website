// import express from "express";
// import bcrypt, { hash } from "bcrypt";
// // // import firebase from 'firebase/compat/app';
// // // import 'firebase/compat/auth';
// // // import 'firebase/compat/firestore';
// // // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore, DocumentReference, CollectionReference, setDoc, getDoc, updateDoc } from "firebase/firestore";
// // // import 'firebase/compat/auth';
// // // import 'firebase/compat/firestore';
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: "AIzaSyDbcydGVH8peSnIyKUgX6zvlJ2O1HKSGsI",
//   authDomain: "e-com-website-7df61.firebaseapp.com",
//   projectId: "e-com-website-7df61",
//   storageBucket: "e-com-website-7df61.appspot.com",
//   messagingSenderId: "44218842093",
//   appId: "1:44218842093:web:ccf7d8647033ef322885e4"
// };

// // Initialize Firebase
// const firebase = initializeApp(firebaseConfig);
// const db = getFirestore(); 


// // inif server
// const app = express();

// //middlewares
// app.use(express.static("public"));
// app.use(express.json())// enables from shareing


// //routes
// //home routes
// app.get('/404', (reg, res)=> {
//     res.sendFile("404.html", { root : "public"})
// })

// //signup
// app.get('/signup', (reg, res)=> {
//     res.sendFile("signup.html", { root : "public"})
// })

// app.post('/signup', (req, res) => {
//     const{name, email, password, number, tac} = req.body;

//     //form validation
//     if(name.length < 3){
//         res.json({'alert' :'name must be 3 letter long'});
//     }else  if(!email.length){
//         res.json({'alert' :'enter your email'});
//     }else  if(password.length < 8){
//         res.json({'alert' :'password must be 8 letter long'});
//     }else  if(!Number(number) || number.length < 10){
//         res.json({'alert' :'invalid number, please enter valid number'});
//     }else  if(!tac){
//         res.json({'alert' :'you must agree to our terms and conditon.'});
//      }//else{
//     //     //store the data in db
//     //     const users = CollectionReference(db, "users");

//     //     getDoc(DocumentReference(users, email)).then(users => {
//     //         if (users.exists()) {
//     //             return res.json({'alert' : 'email already exist'})
//     //         }else{
//     //             // encrypt the password
//     //             bcrypt.genSalt(10, (err, salt) => {
//     //                 bcrypt.hash(password, salt, (err, hash) => {
//     //                     req.body.password = hash;
//     //                     req.body.seller = false;


    //                     //set the doc
    //                     setDoc(doc(users, email), req.body).then(data => {
    //                         res.json({
    //                             name: req.body.name,
    //                             email: req.body.email,
    //                             seller: req.body.seller,
                                
//     //                         })
//     //                     })
//     //                 })
//     //             })   
//     //         }
//     //     })
//     // }
// }) 


// //404 route
// app.get('/', (reg, res)=> {
//     res.sendFile("index.html", { root : "public"})
// })

// app.use((reg, res) => {
//     res.redirect('/404')
// });

// app.listen(3000, () => {
//     console.log('listening on port 3000');
// })