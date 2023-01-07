import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { toast } from 'react-toastify'
import { Box, Grid, Card, Typography, Button, Paper, styled, TextField, MenuItem } from '@mui/material'

import { createProduct, fetchAllProducts, sortByPrice, deleteProduct } from '../redux/reducer/productReducer'
import { fetchAllCategories } from '../redux/reducer/categoryReducer'
import { setUser, logout } from '../redux/reducer/authReducer'
import Header from "./HeaderComponent"
import { addToCart } from '../redux/reducer/cartReducer'

import { Product } from '../types/Product'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { WritableDraft } from 'immer/dist/internal'



const Home = (props: any) => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const products = useAppSelector(state => state.productReducer.filter(item => {
    return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1
  }))
  const categories = useAppSelector(state => state.categoryReducer)
  const dispatch = useAppDispatch()
  const [selectedCategory, setSelectedCategory] = useState(1)
  const [singleProductId, setSingleProductId] = useState(0)
  const sortPriceAsc = () => {
    dispatch(sortByPrice("asc"))
  }
  const sortPriceDesc = () => {
    dispatch(sortByPrice("desc"))
  }
  //addProduct need to change
  const addProduct = () => {
    dispatch(createProduct({
      title: "Revlon London",
      price: 10,
      description: "A description",
      categoryId: 1,
      images: ["https://placeimg.com/640/480/any"]
    }))
  }
  const onDelete = (id: number) => {
    dispatch(deleteProduct(id))
  }
  useEffect(() => {
    const payload = {
      selectedCategory
    }
    dispatch(fetchAllProducts(payload))
  }, [selectedCategory])
  useEffect(() => {
    dispatch(fetchAllCategories())
  }, [])
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement> | any) => {
    setSelectedCategory(e.target.value)
  }
  const handleClick = () => {
    dispatch(logout())
    toast.success("User logout successfully")
    navigate('/auth')
  }
  const handleSelect = (productId: number) => {
    props.selectId(productId);
    navigate(`/product/${productId}`)
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const handleCart = (product: WritableDraft<Product>) => {
    dispatch(addToCart(product))
  }

  return (
    <>
      <Header />
      <Box >
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={sortPriceAsc}>Price low to high</Button>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={sortPriceDesc}>Price high to low</Button>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={addProduct}>Add Product</Button>
        <TextField type="text" name="search" id="search" label="Search item" variant="filled"
          value={search} onChange={(e) => setSearch(e.target.value)} />
        <TextField
          id="category-list"
          select
          label="Select Category"
          defaultValue="All"
          helperText="Please select your category"
          variant="filled"
          name="category-list"
          onChange={(e) => handleCategoryChange(e)}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => handleClick()}>Logout</Button>
      </Box>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(4, 1fr)' }} >
        {products.map(product => (
          <Box>
            <Item key={product.id} onClick={(e) => handleSelect(product.id)}>
              <Box sx={{ width: "100%" }} component='img' src={product.images[2]} id="product_img"></Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Product Category Id: {product.category.id}</Typography>
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>{product.title}</Typography>
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>{product.price}€</Typography>
            </Item>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}
              onClick={() => handleCart(product)}>Add to Cart</Button>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}
              onClick={() => onDelete(product.id)}>Delete Product</Button>
          </Box>
        ))}
      </Box>
    </>

  )
}

export default Home

function dispatch(arg0: AsyncThunkAction<Product[] | Error | undefined, void, { state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown }>) {
  throw new Error('Function not implemented.')
}
