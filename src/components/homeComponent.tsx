import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit'
import React, { useEffect, useState, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { toast } from 'react-toastify'
import { useNavigate, Link, useParams } from 'react-router-dom'

import {
  Box, Grid, Card, Typography, Button, Paper, styled,
  TextField, MenuItem, Modal, FormControl, Select, InputLabel
} from '@mui/material'

import { fetchAllProducts, sortByPrice, deleteProduct } from '../redux/reducer/productReducer'
import { fetchAllCategories } from '../redux/reducer/categoryReducer'
import { setUser, logout } from '../redux/reducer/authReducer'
import { addToCart } from '../redux/reducer/cartReducer'

import Header from "./HeaderComponent"
import AddProduct from '../pages/createProduct'
import EditProduct from '../pages/editProduct'
import Pagination from './pagination'

import { Product } from '../types/Product'
import { WritableDraft } from 'immer/dist/internal'

// let PageSize = 10;

const Home = (props: any) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const categories = useAppSelector(state => state.categoryReducer)
  // const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("")
  const products = useAppSelector(state => state.productReducer.filter(item => {
    return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1
  }))
  const [selectedCategory, setSelectedCategory] = useState(1)
  const [singleProductId, setSingleProductId] = useState(0)
  const [isAdmin, setAdmin] = useState(false)

  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return products.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage]);

  const sortPriceAsc = () => {
    dispatch(sortByPrice("asc"))
  }
  const sortPriceDesc = () => {
    dispatch(sortByPrice("desc"))
  }
  const handleEdit = (pId: number) => {
    props.selectPid(pId);
    navigate('/edit-product')
  }
  const onDelete = (id: number) => {
    dispatch(deleteProduct({ id }))
    toast.success("Product deleted successfully")
    navigate('/home')
  }
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement> | any) => {
    setSelectedCategory(e.target.value)
  }
  const handleSelect = (productId: number) => {
    props.selectId(productId);
    navigate(`/product/${productId}`)
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
  useEffect(() => {
    if (props.userDetail.email === 'admin@mail.com') {
      setAdmin(true)
    }
  }, [])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))
  const handleCart = (product: WritableDraft<Product>) => {
    dispatch(addToCart(product))
  }
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const [openAddModal, setAddModalOpen] = useState(false);
  const addModalOpen = () => setAddModalOpen(true)
  const addModalClose = () => setAddModalOpen(false)

  return (
    <>
      <Header user={props.userDetail.email} />
      <Box sx={{ m: 3, display: 'flex', gap: 3, flexTemplateColumns: 'repeat(6, 1fr)', justifyContent: 'flex-end' }} >
        <Button type="submit" sx={{}} onClick={sortPriceAsc}>Price low to high</Button>
        <Button type="submit" sx={{}} onClick={sortPriceDesc}>Price high to low</Button>
        <TextField
          type="text" name="search" id="search" label="Search item" variant="outlined" size="small"
          value={search} onChange={(e) => setSearch(e.target.value)} />
        {/* <TextField
          id="category-list"
          select
          label="Select Category"
          defaultValue="All"
          helperText="Please select your category"
          variant="outlined"
          size = "small"
          name="category-list"
          onChange={(e) => handleCategoryChange(e)}
        > */}
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="category-list">Select your Category</InputLabel>
            <Select
              id="demo-simple-select"
              label="Category"
              size="small"
              name="category-list"
              onChange={(e) => handleCategoryChange(e)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* </TextField> */}
        {isAdmin ? (
          <Button type="submit" variant="contained" onClick={addModalOpen}>Add Product</Button>
        ) : ('')}
        <Modal
          open={openAddModal}
          onClose={addModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddProduct />
          </Box>
        </Modal>
      </Box>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(4, 1fr)' }} >
        {products.map(product => (
          <Box>
            <Item key={product.id} onClick={(e) => handleSelect(product.id)}>
              <Box sx={{ width: "100%" }} component='img' src={product.images[0]} id="product_img"></Box>
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>{product.title}</Typography>
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>{product.price}€</Typography>
            </Item>
            {!isAdmin ? (<Button type="submit" variant="contained" sx={{ m: 3 }}
              onClick={() => handleCart(product)}>Add to Cart</Button>
            ) :
              (<Box>
                <Button sx={{ m: 3 }} type="submit" variant="contained"
                  onClick={(e) => handleEdit(product.id)}>Edit</Button>
                <Button sx={{ m: 3 }} type="submit" variant="contained"
                  onClick={() => onDelete(product.id)}>Delete</Button>
              </Box>
              )}
          </Box>
        ))}
      </Box>
      {/* <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={products.length}
        pageSize={PageSize}
        onPageChange={(page: React.SetStateAction<number>) => setCurrentPage(page)}
      /> */}
    </>

  )
}

export default Home

function dispatch(arg0: AsyncThunkAction<Product[] | Error | undefined, void, { state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown }>) {
  throw new Error('Function not implemented.')
}
