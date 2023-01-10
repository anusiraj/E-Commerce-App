import React from 'react'
import { useEffect, useState, useMemo } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import {
    Box, Grid, Card, Typography, Button, Paper, styled,
    TextField, MenuItem, Modal, FormControl, Select, InputLabel,
} from '@mui/material'

import Header from "./HeaderComponent"
import Footer from "./FooterComponent"

import { fetchFeaturedProducts } from '../redux/reducer/productReducer'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { grid } from '@mui/system';


const EntryPage = (props: any) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const products = useAppSelector(state => state.productReducer)

    useEffect(() => {
        dispatch(fetchFeaturedProducts())
    }, [])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }))
    const handleClick = () => {
        navigate('/home')
    }
    const handleSelect = (productId: number) => {
        props.idSelected(productId);
        navigate(`/product/${productId}`)
    }
    return (
        <>
            <Header />
            <Carousel autoPlay showThumbs={false}>
                <Grid sx={{ height: "70vh" }}>
                    <img src={window.location.origin + '/assets/hero3.jpg'} />
                    <Typography className="legend">Legend 1</Typography>
                </Grid>
                <Grid sx={{ height: "70vh" }}>
                    <img src={window.location.origin + '/assets/hero2.jpg'} />
                    <Typography className="legend">Legend 2</Typography>
                </Grid>
                <Grid sx={{ height: "70vh" }}>
                    <img src={window.location.origin + '/assets/hero1.jpg'} />
                    <Typography className="legend">Legend 3</Typography>
                </Grid>
            </Carousel>
            <Box className="body" sx={{ display: 'grid', justifyContent: "center", textAlign: "center" }}>
                <Box>
                    <Typography variant="overline" sx={{ fontWeight: 'bold', fontSize: 25, m: 5 }} >
                        Our Featured products
                    </Typography>
                </Box>
                <ImageList cols={4} gap={20} sx={{ width: 800, height: 450, m: 4 }}>
                    {products.map((item) => (
                        <ImageListItem key={item.id}>
                            <img
                                src={item.images[0]}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar onClick={(e) => handleSelect(item.id)}
                                title={item.title}
                                subtitle={item.description}
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item.title}`}
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                <Box>
                    <Button variant="text" sx={{ fontWeight: 'normal', fontSize: 15, m: 5 }} component="div"
                        onClick={handleClick}>
                        More Products
                    </Button>
                </Box>
            </Box>
            <Footer />
        </>
    )
}

export default EntryPage