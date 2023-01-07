import { Box, Typography, Paper, styled, Button } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import Header from "./HeaderComponent"
import CustomizedDialogs from '../pages/review'
import { addToCart } from '../redux/reducer/cartReducer'
import { Product } from '../types/Product'

const ProductDetail = (props: any) => {
  const dispatch = useAppDispatch()
  const [product, setProduct] = useState({ id: 0, title: "", images: [''], price: 0, description: "" })
  const { PRid } = useParams()
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))
  const productId = props.detailedPId
  useEffect(() => {
    const fetchData = async (id: number) => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const json = await response.json();
        setProduct(json)
      } catch (error) {
        console.log("error", error);
      }
    }

    fetchData(productId);
  }, [productId]);

  const handleOpen = (e: React.ChangeEvent<HTMLSelectElement> | any) => {
    < CustomizedDialogs />
  }
  const handleCart = (product:any) => {
    // dispatch(addToCart(product))
  }
  return (
    <>
      <Header />
      {/* <Box sx={{ display: 'grid', width: "50%", height: "70%", margin: "4rem" }}> */}
      <Box sx={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, 1fr)', margin: "4rem" }} >
        <Item key={product.id}>
          <Box sx={{ width: "100%" }} component='img' src={product.images[1]} id="product_img"></Box>
          <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>{product.title}</Typography>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() =>handleCart(product)}>
            Add To Cart
          </Button>
        </Item>
        <Item>
          <Typography variant='subtitle1' sx={{ fontWeight: 'bold', textAlign: 'left' }}>{product.description}</Typography>
          <Typography variant='subtitle1' sx={{ fontWeight: 'bold', fontSize: 35, textAlign: 'left' }}>{product.price}€</Typography>
          <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }} onClick={(e) => handleOpen(e)}>Read Reviews</Button>
        </Item>
      </Box>
      {/* </Box> */}
    </>

  )
}

export default ProductDetail