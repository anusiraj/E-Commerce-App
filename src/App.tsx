import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Box } from '@mui/material'

import { Product } from './types/Product'
import Home from './components/homeComponent'
import Auth from './components/Auth'
import ProductDetail from './components/ProductComponent'
import PrivateRoute from './components/PrivateRouteComponent'
import Header from './components/HeaderComponent'
import Cart from './components/CartComponent'
import Profile from './components/profileComponent'
import EditProduct from './pages/editProduct'
import { useState } from 'react'

import './Style.css';

const App = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [productDetailedinfo, setProductDetailedInfo] = useState(0);
  const [productDetail, setProductDetail] = useState(0);
  const [userDetailedinfo, setUserDetailedInfo] = useState('');

  const idSelectedHandler = (id: any) => {
    const idd: number = +id;
    setProductDetailedInfo(idd);
  };
  const PidSelectedHandler = (id: any) => {
    const idd: number = +id;
    setProductDetail(idd);
  };
  const userSelectedHandler = (userValue:any) => {
    setUserDetailedInfo(userValue)
  }
  return (
    <div className='app'>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to='/auth' replace />} />
          <Route path="/auth" element={<Auth selectUser = {userSelectedHandler} />} />
          <Route path="/home" element={<PrivateRoute>
            <Home selectPid={PidSelectedHandler} selectId={idSelectedHandler} userDetail = {userDetailedinfo}  />
          </PrivateRoute>
          } />
          <Route path="/product/:id" element={<ProductDetail detailedPId={productDetailedinfo} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile userDetail = {userDetailedinfo}/>} />
          <Route path="/edit-product" element={
          <EditProduct pDetail = {productDetail} />} 
          />
        </Routes>
      </BrowserRouter>
    </div>

  )
}
export default App

function dispatch(arg0: AsyncThunkAction<Product[] | Error | undefined, void, { state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown }>) {
  throw new Error('Function not implemented.')
}
