import express from "express";
import bcrypt from "bcrypt";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, doc, collection, setDoc, getDoc, updateDoc } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbcydGVH8peSnIyKUgX6zvlJ2O1HKSGsI",
    authDomain: "e-com-website-7df61.firebaseapp.com",
    projectId: "e-com-website-7df61",
    storageBucket: "e-com-website-7df61.appspot.com",
    messagingSenderId: "44218842093",
    appId: "1:44218842093:web:ccf7d8647033ef322885e4"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();


// inif server
const app = express();

//middlewares
app.use(express.static("public"));
app.use(express.json())// enables from shareing


//routes
//home routes
app.get('/', (reg, res) => {
    res.sendFile("index.html", { root: "public" })
})
//signup
app.get('/signup', (reg, res) => {
    res.sendFile("signup.html", { root: "public" })
})
app.post('/signup', (req, res) => {
    const { name, email, password, number, tac } = req.body;
    //form validation
    if (name.length < 3) {
        res.json({ 'alert': 'name must be 3 letter long' });
    } else if (!email.length) {
        res.json({ 'alert': 'enter your email' });
    } else if (password.length < 8) {
        res.json({ 'alert': 'password must be 8 letter long' });
    } else if (!Number(number) || number.length < 10) {
        res.json({ 'alert': 'invalid number, please enter valid number' });
    } else if (!tac) {
        res.json({ 'alert': 'you must agree to our terms and conditon.' });
    } else {
        const users = collection(db, "users");
        getDoc(doc(users, email)).then(user => {
            if (user.exists()) {
                return res.json({ 'alert': 'email already exists' })
            } else {
                //encrypt the passwords
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        req.body.seller = false;

                        //set the doc
                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                seller: req.body.seller,

                            })
                        })
                    })

                })
            }
        })
    }
})

app.get('/login', (req, res) => {
    res.sendFile("login.html", { root: "public" })
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;

    if(!email.length || !password.length){
        res.json({ 'alert' : 'fill all the inputs'})
    }

    const users = collection(db, "users");

    getDoc(doc(users, email))
    .then(user => {
        if(!user.exists()){
            return res.json({ 'alert' : 'email does not exists'});
        }else{
            bcrypt.compare(password, user.data().password, (err, result) => {
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller
                    })
                }else{
                    return res.json({ 'alert' : 'password is incorrect'})
                }
            })
        }
    })
})

//seller route

app.get('/seller', (reg, res) => {
    res.sendFile("seller.html", { root: "public" })
})

app.post('/seller', (req, res) => {
    let { name, address, about, number, email } = req.body;

    if(!name.length || !address.length || !about.length || number.length < 10 || !Number(number)){
        return res.json({ 'alert' : 'some information(s) is/are incorrect'});
    }else{
        // update the seller status
        const sellers= collection(db, "sellers");
        setDoc(doc(sellers, email), req.body)
        .then(data =>{
            const users = collection(db, "users");
            updateDoc(doc(users, email), {
                seller: true
            })
            .then(data => {
                res.json({ 'seller' : true})
            })
        })
    }
})

// deshboard
app.get('/deshboard', (reg, res) => {
    res.sendFile("deshboard.html", { root: "public" })
})

//404 route
app.get('/404', (reg, res) => {
    res.sendFile("404.html", { root: "public" })
})

app.use((reg, res) => {
    res.redirect('/404')
});

app.listen(3000, () => {
    console.log('listening on port 3000');
})


