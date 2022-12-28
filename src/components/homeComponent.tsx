import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'

import { createProduct, fetchAllProducts, sortByName, deleteProduct} from '../redux/reducer/productReducer'
import { fetchAllCategories } from '../redux/reducer/categoryReducer'

import { Product } from '../types/Product'


const Home = () => {
  const products = useAppSelector(state => state.productReducer)
  const categories = useAppSelector(state => state.categoryReducer)
  const dispatch = useAppDispatch()
  console.log("Product List: ", products)
  const [selectedCategory, setSelectedCategory] = useState(1);
  console.log("categoryID-"+ selectedCategory)

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
  useEffect(() => {
    const payload = {
      selectedCategory
    }
    dispatch(fetchAllProducts(payload))
  },[selectedCategory])
  useEffect(() => {
    dispatch(fetchAllCategories())
  },[])  
  function handleCategoryChange(event:any) {
    setSelectedCategory(event.target.value)
  }
  
  return (
    <div className='main'>
        <button onClick ={sortName}>Sort By Name</button>
        <button onClick ={addProduct}>Add Product</button>
        <label htmlFor='category' className='label'>Filter by Category</label>
          <select name="category-list" id="category-list" onChange={handleCategoryChange}>
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
            <p>Product Category Id: {product.category.id}</p>
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
