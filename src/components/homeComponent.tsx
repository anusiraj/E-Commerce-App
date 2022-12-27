import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { createProduct, fetchAllProducts, sortByName, deleteProduct } from '../redux/reducer/productReducer'
import { fetchAllCategories } from '../redux/reducer/categoryReducer'
import { Product } from '../types/Product'
import { Category } from '../types/Category'


const Home = () => {
  const products = useAppSelector(state => state.productReducer)
  const categories = useAppSelector(state => state.categoryReducer)
  const dispatch = useAppDispatch()
  console.log("Product List: ", products)
  const sortName = () => {
    dispatch(sortByName("asc"))
  }
  const addProduct = () => {
    dispatch(createProduct({
      title: "Revlon London",
      price: 10,
      description: "A description",
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"]
    }))
  }
  const onDelete = (id:number) => {
    dispatch(deleteProduct(id))
  }
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat_id = e.target.value;
    console.log(cat_id);
    // dispatch(productByCategory(cat_id))
  }
  useEffect(() => {
    dispatch(fetchAllProducts())
  },[])
  useEffect(() => {
    dispatch(fetchAllCategories())
  },[])  
  
  return (
    <div className='main'>
        <button onClick ={sortName}>Sort By Name</button>
        <button onClick ={addProduct}>Add Product</button>
        <label htmlFor='category' className='label'>Category</label>
          <select onChange={(e) => handleSelect(e)}>
              {categories.map(category =>
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
              )}
          </select>
        <div className='products'>
          {products.map(product => (
          <div className='product_list' key = {product.id}>
            <img src={product.images[0]} id = "product_img"></img>
            <p>{product.title}</p>
            <p>{product.price}</p>
            <button onClick={() => onDelete(product.id)}>Delete Product</button></div>
            ))}
        </div>

    </div>
  )
}

export default Home

function dispatch(arg0: AsyncThunkAction<Product[] | Error | undefined, void, { state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown }>) {
  throw new Error('Function not implemented.')
}
