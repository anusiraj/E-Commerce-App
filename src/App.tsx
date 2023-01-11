import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit'

import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "./styles/style.scss";

import { Product } from './types/Product'

import Home from './components/homeComponent'
import Auth from './components/Auth'
import ProductDetail from './components/ProductComponent'
import LoadingtoRedirect from './components/LoadingtoRedirectComponent'
import Footer from './components/FooterComponent'
import EntryPage from './components/EntryPageComponent'
import Cart from './components/CartComponent'
import Profile from './components/profileComponent'

import EditProduct from './pages/editProduct'

const App = () => {
  const [productDetailedinfo, setProductDetailedInfo] = useState(0)
  const [productDetail, setProductDetail] = useState(0)
  const [userDetailedinfo, setUserDetailedInfo] = useState('')
  const idSelectedHandler = (id: number) => {
    const idd: number = +id
    setProductDetailedInfo(idd)
  }
  const PidSelectedHandler = (id: number) => {
    const idd: number = +id
    setProductDetail(idd)
  }
  const userSelectedHandler = (userValue: any) => {
    setUserDetailedInfo(userValue)
  }

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<EntryPage idSelected = {idSelectedHandler} />} />
          <Route path="/auth" element={<Auth selectUser={userSelectedHandler} />} />
          <Route path="/home" element={
            <Home selectPid={PidSelectedHandler} selectId={idSelectedHandler} userDetail={userDetailedinfo} />
          } />
          <Route path="/product/:id" element={
            <ProductDetail detailedPId={productDetailedinfo} />
          } />
          <Route path="/cart" element={
            <Cart />
          } />
          <Route path="/private" element={
            <LoadingtoRedirect />
          } />
          <Route path="/profile" element={
            <Profile userDetail={userDetailedinfo} id={0} email={''} password={''} name={''} role={''} />
          } />
          <Route path="/edit-product" element={
            <EditProduct pDetail={productDetail} />
          }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
export default App
function dispatch(arg0: AsyncThunkAction<Product[] | Error | undefined, void, { state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown }>) {
  throw new Error('Function not implemented.')
}
