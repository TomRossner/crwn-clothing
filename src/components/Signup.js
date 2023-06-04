import React, { useState, useEffect} from 'react';
import {GiCrenelCrown} from "react-icons/gi";
import { Link } from 'react-router-dom';
import Input from './common/Input';
import { useNavigate } from "react-router-dom";
import {SlCheck} from "react-icons/sl";
import { useDispatch } from 'react-redux';
import { signUpStart } from '../store/user/userAction';

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const Signup = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [error, setError] = useState("");
    const [userCreated, setUserCreated] = useState(false);
    const {displayName, email, password, confirmPassword} = formFields;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (userCreated) setTimeout(() => {
            navigate("/sign-in");
            setUserCreated(false);
        }, 4000);
    }, [userCreated, navigate])

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            return setError(`Passwords do not match. Please try again.`);
        }
        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
            setUserCreated(true);
        } catch (error) {
            if (error.code === "auth/weak-password"){
                return setError("Password too weak. Password must contain at least 6 characters.")
            }
            else if (error.code === "auth/email-already-in-use") return setError("Email already in use.");
            else return setError("Failed creating user", error.message);
        }
    }

    const resetFormFields = () => setFormFields(defaultFormFields);

    return (
        <div className='account-page-container'>
            {!userCreated ?
            (<form className='auth-form' onSubmit={handleSubmit}>
                <GiCrenelCrown className='icon'/>
                <h2>Create an account</h2>
                <div className='inputs-container'>
                    {error && <span className='error'>{error}</span>}
                    <Input
                        type="text"
                        name="displayName"
                        placeholder="Display name"
                        title="Display name"
                        value={displayName}
                        required
                        onChange={handleChange}
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        title="Email"
                        value={email}
                        required
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        title="Password"
                        value={password}
                        required
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        title="Confirm password"
                        value={confirmPassword}
                        required
                        onChange={handleChange}
                    />
                    <br></br>
                    <button type='submit' className='btn'>Sign up</button>
                </div>
                <div className='sign-up-forgot-password'>
                    <p>Already have an account? <Link to="/sign-in" className='link'>Sign in</Link>.</p>
                </div>
            </form>
            ) : (
            <div className='user-signup-success'>
                <SlCheck className='icon'/>
                <p>Account created successfully</p>
            </div> 
            )}       
        </div>
      )
}

export default Signup;