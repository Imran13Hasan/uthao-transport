import React, { useContext, useState } from 'react';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(true);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        success: false,
        error: '',
        error_password: false
    })
    console.log(user);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((res) => {
                const { email, photoURL, displayName } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setLoggedInUser(signedInUser)
                history.replace(from);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    const handleGetInput = (e) => {
        let isFieldValid = true;

        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = passwordHasNumber && isPasswordValid;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }


    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.success = true;
                    newUserInfo.isSignedIn = true;
                    newUserInfo.error = '';
                    setLoggedInUser(newUserInfo)
                    handleUpdateUserName(user.name)
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.isSignedIn = true;
                    newUserInfo.success = true;
                    newUserInfo.error = '';
                    setLoggedInUser(newUserInfo)
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        e.preventDefault();
    }

    const handleUpdateUserName = (name) => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then((res) => {
            console.log('User name updated successfully', res.user)
        }).catch((error) => {
            console.log(error.message)
        });
    }


    return (
        <div className="login-container">
            <div className="login-form">
                <form action="" onSubmit={handleSubmit}>
                    {
                        user.success && <p style={{ color: 'green' }}>✅User {newUser ? "created" : "signed in"} successfully</p>
                    }
                    {
                        user.error && <p style={{ color: 'red' }}>{user.error}</p>
                    }
                    {newUser ? <h3>Create an account</h3> : <h4>Sign In</h4>}
                    {newUser && <input type="text" onBlur={handleGetInput} name="name" required placeholder="Name" id="" />}
                    <input type="email" onBlur={handleGetInput} name="email" required placeholder="Email" id="" />
                    <input type="password" onBlur={handleGetInput} name="password" required placeholder="Password" id="" />
                    {/* {user.error_password && <small><p style={{ color: 'red' }}>*Invalid Password! Please enter at least 6 characters including 1 digit</p></small>} */}
                    <input type="password" onBlur={handleGetInput} name="confirm_password" placeholder="Confirm Password" id="" />
                    <input className="submit-btn" type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
                    <p> {newUser ? "Already have an account?" : "Don't have an account?"} <Link onClick={() => setNewUser(!newUser)}>{newUser ? "Sign In" : "Sign Up"}</Link></p>
                </form>
            </div>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;