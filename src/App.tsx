import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Product } from './types/Product'
import Home from './components/homeComponent'
import Auth from './components/Auth'

import './Style.css';

const App = () => {
  return (
    <div className = 'app'>
      <BrowserRouter>
      <ToastContainer/>
        <Routes>
          <Route path = "/" element = {<Navigate to = '/auth' replace />} />
          <Route path = "/auth" element = {<Auth/>}/>
          <Route path = "/home" element = {<Home/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}
export default App

function dispatch(arg0: AsyncThunkAction<Product[] | Error | undefined, void, { state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown }>) {
  throw new Error('Function not implemented.')
}
