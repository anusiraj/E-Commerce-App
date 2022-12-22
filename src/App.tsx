import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/reduxHook'
import { createProduct, fetchAllProducts, sortByName } from './redux/reducer/productReducer'
import { Product } from './types/Product'

const App = () => {
  const products = useAppSelector(state => state.productReducer)
  const dispatch = useAppDispatch()
  console.log("Product List: ", products)
  const sortName = () => {
    dispatch(sortByName("asc"))
  }
  const addProduct = () => {
    dispatch(createProduct({
      title: "New Product",
      price: 10,
      description: "A description",
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"]
    }))
  }
  useEffect(() => {
    dispatch(fetchAllProducts())
  },[])
  return (
    <div>
        <button onClick ={sortName}>sort</button>
        <button onClick ={addProduct}>Add Product</button>
        {products.map(product => (<p key = {product.id}>{product.title}</p>))}
    </div>
  )
}

export default App

function dispatch(arg0: AsyncThunkAction<Product[] | Error | undefined, void, { state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown }>) {
  throw new Error('Function not implemented.')
}
