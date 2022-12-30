import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../hooks/reduxHook'
import { setUser } from '../redux/reducer/authReducer'

import { useLoginUserMutation, useRegisterUserMutation } from '../services/authApi'
import { AuthType } from '../types/Auth'

const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: ""
}
const Auth = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const[formValue, setFormValue] = useState(initialState)
    const {email, password, confirmPassword, name, avatar} = formValue
    const[showRegister, setShowRegister] = useState(false)
    const handleChange = (e:any) => {
        setFormValue({...formValue,[e.target.name]:e.target.value})
    }
    const [loginUser, 
        {data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: LoginEror}] = useLoginUserMutation()
    const [registerUser, 
        {data: registerData, isSuccess: isRegisterSuccess, isError: isRegisterError, error: RegisterEror}] = useRegisterUserMutation()
    const handleLogin = async() => {
        if(email && password) {
            await loginUser({email, password})
        }
        else {
            toast.error("Please fill all required fileds!")
        }
    }
    const handleRegister = async() =>{
        if(password !== confirmPassword) {
            toast.error("Password don't match")
        }
        else {
            const avatar = "https://api.lorem.space/image/face?w=640&h=480"
            if (email && password && name && avatar) {
                await registerUser({email, password, name, avatar})
            }
        }
    }
    useEffect(() => {
        if(isLoginSuccess) {
            toast.success('User login successfully')
            dispatch(setUser({
                token: loginData
            }))
            navigate("/home")
        }
        if(isRegisterSuccess) {
            toast.success('User register successfully')
            dispatch(setUser({
                token: registerData
            }))
            navigate("/home")
        }
    },[isLoginSuccess, isRegisterSuccess])
    useEffect(() => {
        if(isLoginError) {
            toast.error((LoginEror as any).data.message)
        }
        if(isRegisterError) {
            toast.error((RegisterEror as any).data.message)
        }
    },[isLoginError, isRegisterError])
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
                    <form>
                        <label htmlFor='email'>Email:</label>
                        <input type = "text" name = "email" id = "email" value = {email} onChange = {handleChange} /><br/>
                        <label htmlFor='password'>Password:</label>
                        <input type = "password" name = "password" id = "password" value = {password} onChange = {handleChange} /><br/>
                    </form>
                    
                    {showRegister && (
                        <form>
                        <label htmlFor='confirmPassword'>Confirm Password:</label>
                        <input type = "password" name = "confirmPassword" id = "confirmPassword" value = {confirmPassword} onChange = {handleChange} /><br/>
                        {/* <label htmlFor='avatar'>Avatar:</label>
                        <input type = "text" name = "avatar" id = "avatar" value = {avatar} onChange = {handleChange} /> */}
                        </form>
                    )}
                </div>
                {!showRegister? 
                (<button type = "submit" onClick={() => handleLogin()}>
                    Login
                    </button>) :
                (<button type = "submit" onClick={() => handleRegister()}>Register</button>)
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