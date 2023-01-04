import React, { useEffect, useState } from 'react';
import {GiCrenelCrown} from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import Input from './common/Input';
import { getRedirectResult } from "firebase/auth";
import {
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    // signInWithGoogleRedirect,
    auth,
    signInUserWithEmailAndPassword
} from "../utils/firebase";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/user/userSelector';

const defaultFormFields = {
    email: "",
    password: ""
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const resetFormFields = () => setFormFields(defaultFormFields);
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const signInWithGoogle = async () => await signInWithGooglePopup();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) return setErrors("Please enter your email and password.");
        try {
            await signInUserWithEmailAndPassword(email, password);
            if (errors) setErrors("");
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    setErrors("Invalid email or password. Please try again.");
                    break;
                case "auth/user-not-found":
                    setErrors("User not found.");
                    break;
                case "auth/invalid-email":
                    setErrors("Invalid email. Please try again.");
                    break;
                case "auth/too-many-requests":
                    setErrors("Too many requests. Please try again later.");
                    break;
                case "auth/popup-closed-by-user":
                    setErrors("Failed to login. Please try again.");
                    break;
                default:
                    console.log(error);
            }
        }
    }

    useEffect(() => {
        if (currentUser) navigate("/CRWN-Clothing/");
    }, [currentUser])

    useEffect(() => {
        const awaitRedirectResult = async () => {
            const response = await getRedirectResult(auth);
            if (response) {
                await createUserDocumentFromAuth(response.user);
            }
        }
        awaitRedirectResult();
    }, [])

  return (
    <div className='account-page-container'>
        <form className='auth-form' onSubmit={handleSubmit}>
            <GiCrenelCrown className='icon'/>
            <h2>Sign in</h2>
            {errors && <p className='error'>{errors}</p>}
            <div className='inputs-container'>
                <Input
                    type="email"
                    placeholder='Email'
                    title='Email'
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    placeholder='Password'
                    title='Password'
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <div className='remember-me'>
                    <input type="checkbox" id='remember'/>
                    <label htmlFor='remember'>Remember me</label>
                </div>
                <button type='submit' className='btn'>Sign in</button>
                <button
                    type='button'
                    className='btn blue'
                    onClick={signInWithGoogle}
                >
                    Sign in with Google
                </button>
                {/* <button
                    type='button'
                    className='btn blue'
                    onClick={signInWithGoogleRedirect}
                >
                    Sign in with Google Redirect
                </button> */}
            </div>
            <div className='sign-up-forgot-password'>
                <p>Don't have an account? <Link to="/sign-up" className='link'>Sign up</Link>.</p>
                {/* <Link to="" className='link'>I forgot my password</Link> */}
            </div>
        </form>
    </div>
  )
}

export default SignIn;