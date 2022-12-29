import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../hooks/reduxHook'
import { setUser } from '../redux/reducer/authReducer'

import { useLoginUserMutation } from '../services/authApi'
import { AuthType } from '../types/Auth'

const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}
const Auth = () => {
    const[formValue, setFormValue] = useState(initialState)
    const { name, email, password, confirmPassword } = formValue
    const[showRegister, setShowRegister] = useState(false)
    const handleChange = (e:any) => {
        setFormValue({...formValue,[e.target.name]:e.target.value})
    }
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [loginUser, 
        {data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: LoginEror}] = useLoginUserMutation()
    const handleLogin = async() => {
        if(email && password) {
            await loginUser({email, password})
        }
        else {
            toast.error("Please fill all required fileds!")
        }
    }
    useEffect(() => {
        if(isLoginSuccess) {
            toast.success('User login successfully')
            // dispatch(setUser({
            //     name: formValue.name,
            //     token: loginData.token
            // }))
            navigate("/home")
        }
    },[isLoginSuccess])
    return(
        <section className='auth'>
            <div className='auth-section'>
                <h2>
                    {!showRegister? "Login" : "Register"}
                </h2>
                <p>
                    {!showRegister? "Please enter you email and password" : 
                    "Please enter user detail"}
                </p>
                <div className='login-form'>
                    {showRegister && (
                        <>
                        <label htmlFor='name'>Name:</label>
                        <input type="text" name="name" id="name" value={name} onChange={handleChange} /><br/>
                        </>
                    )}
                    <label htmlFor='email'>Email:</label>
                    <input type = "text" name = "email" id = "email" value = {email} onChange = {handleChange} /><br/>
                    <label htmlFor='password'>Password:</label>
                    <input type = "password" name = "password" id = "password" value = {password} onChange = {handleChange} /><br/>
                    {showRegister && (
                        <>
                        <label htmlFor='confirmPassword'>Confirm Password:</label>
                        <input type = "password" name = "confirmPassword" id = "confirmPassword" value = {confirmPassword} onChange = {handleChange} />
                        </>
                    )}
                </div>
                {!showRegister? 
                (<button type = "submit" onClick={() => handleLogin()}>
                    Login
                    </button>) :
                (<button type = "submit">Register</button>)
                }
                <div>
                    <h2 className='login-form_below'>
                        {!showRegister?
                        (
                            <>
                            Don't have an account ?
                            <p className='no-account' style = {{cursor:"pointer"}}
                                onClick = {() => setShowRegister(true)}>
                                Sign Up
                            </p>
                            </>
                        ) 
                        :(
                            <>
                            Already have an account ?
                            <p className='no-account' style = {{cursor:"pointer"}}
                                onClick = {() => setShowRegister(false)}>    
                                Signin                          
                            </p>
                            </>
                        )}
                    </h2>
                </div>
            </div>
        </section>
    )
}
export default Auth