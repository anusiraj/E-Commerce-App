import { incrementQuantity, decrementQuantity, removeItem } from '../redux/reducer/cartReducer'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { Box, Grid, Card, Typography, Button, Paper, styled, TextField, MenuItem } from '@mui/material'

const CartItem = (props: { id: number, title: string, image: any, price: number, quantity: number }) => {
  const { id, title, price, quantity } = props;
  const dispatch = useAppDispatch()
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <Box>
      <Item>
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {/* <Box sx={{ width: "100%" }} component='img' src={image} id="product_img"></Box> */}
          <Typography className="cartItem__title">{title}</Typography>
          <Typography className="cartItem__price">
            <small>$</small>
            <strong>{price}</strong>
          </Typography>
          <Box>
            <Button onClick={() => dispatch(decrementQuantity(id))}>-</Button>
            <Typography>{quantity}</Typography>
            <Button onClick={() => dispatch(incrementQuantity(id))}>+</Button>
          </Box>
          <Button
            className='cartItem__removeButton'
            onClick={() => dispatch(removeItem(id))}>
            Remove
          </Button>
        </Box>
      </Item>
    </Box>
  )
}

export default CartItem