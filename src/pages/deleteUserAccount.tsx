import * as React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material'
import { useAppDispatch } from '../hooks/reduxHook'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

import { logout } from '../redux/reducer/authReducer'
import { deleteUser } from '../redux/reducer/userReducer'

const DeleteForm = (props: any) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleDelete = () => {
        dispatch(deleteUser({ id: props.userId }))
        toast.success("Your account has been deleted!")
        dispatch(logout())
        toast.success("User logout successfully")
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
