import { incrementQuantity, decrementQuantity, removeItem} from '../redux/reducer/cartReducer'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { Box, Grid, Card, Typography, Button, Paper, styled, TextField, MenuItem } from '@mui/material'

import CartItem from './cartPage'
import { Key, useEffect, useState } from 'react'

function Cart() {
  const cart = useAppSelector((state) => state.cartReducer.cartItems);
  const dispatch = useAppDispatch()
  return (
    <Box>
      <Box>
        {!cart?( <Typography sx = {{ m: 4, fontSize: 25 }}>Your shopping Cart is empty!</Typography>):
        (<Box>
          <Typography sx = {{ m: 4, fontSize: 25 }}>Your Shopping Cart</Typography>
          {cart?.map((item: {
              id:number, title:string,images: any, price:number, quantity:number}) => (
             <CartItem
               key={item.id}
               id={item.id}
               title={item.title}
               image={item.images[0]}
               price={item.price}
               quantity={item.quantity}
             />
           ))}
          </Box>)}
      </Box>
  </Box>
      )}
export default Cart