import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(() => {
                const signedInUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: ''
                }
                setLoggedInUser(signedInUser)
            }).catch((error) => {
                console.log(error)
            });
    }

    return (
        <div>
            <div className="navbar">
                <div className="logo">
                    <Link className="nav-link" aria-current="page" to="/home">UTHAO</Link>
                </div>
                <div className="navbar-nav">
                    <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                    <Link className="nav-link" to="/destination">Destination</Link>
                    <Link className="nav-link" to="#">Blog</Link>
                    <Link className="nav-link" to="#">Contact</Link>
                    {
                        loggedInUser.isSignedIn ? <Link className="nav-link login" onClick={handleSignOut}>Logout</Link> : <Link className="nav-link login" to="/login">Login</Link>
                    }
                    {
                        loggedInUser.photo && <div className="pro-pic">
                            <img src={loggedInUser.photo} alt="" />
                        </div>
                    }
                    <h3 style={{color: 'gray'}}>{loggedInUser.name}</h3>
                </div>
            </div>
        </div>
    );
};

export default Header;