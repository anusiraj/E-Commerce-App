import * as React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

import { logout } from '../redux/reducer/authReducer'
import { deleteUser } from '../redux/reducer/userReducer'

const DeleteForm = (props: any) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.userReducer)
    const navigate = useNavigate()
    const handleDelete = async() => {
        try {
            await dispatch(deleteUser({ id: props.userId }))
        }
        catch(e) {
            console.log(e)
        }
        toast.success("Your account has been deleted!")
        dispatch(logout())
        navigate('/auth')
    }
    return (
        <Box>
            <Typography>Are you sure you want to delete!</Typography>
            <Button onClick={handleDelete}>Delete</Button>
        </Box>
    )
}
export default DeleteForm
