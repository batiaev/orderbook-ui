import React, {useEffect, useState} from 'react';
import OrderBookService from '../services/OrderBookService';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useOrderBookState} from "../hooks/useOrderBookState";
import {Avatar, Card, CardContent, CardHeader, Grid, IconButton, TextField} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from '@mui/icons-material/Settings';

function SettingsComponent() {
    const [frequency, setFrequency] = useState(250);//ms
    const [bbo, setBbo] = useState({bid: 0, ask: 0});
    const [product, setProduct] = useState("ETH-USD");
    const {orderBook, setOrderBook} = useOrderBookState();
    const [isActive, setIsActive] = useState(false);

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setOrderBook([]);
        setBbo({bid: 0, ask: 0})
        setIsActive(false);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            const params = new URLSearchParams(window.location.search)
            let id = params.get('productId') || 'ETH-USD'
            setProduct(id);
            interval = setInterval(() => {
                OrderBookService.getOrderBook(product)
                    .then((response) => {
                        setOrderBook(response.data);
                        setBbo({
                            bid: orderBook[orderBook.length / 2].priceLevel.toFixed(2),
                            ask: orderBook && orderBook[orderBook.length / 2 - 1].priceLevel.toFixed(2)
                        })
                    })
            }, frequency);
        } else if (!isActive && orderBook !== []) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [setOrderBook, product, isActive, orderBook, frequency]);

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        <SettingsIcon/>
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title="Settings"
                // subheader={'ETH-USD'}
            />
            <CardContent>
                <Grid container spacing={2} padding={2}>
                    <Grid item xl={12}>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={toggle}
                                    variant={isActive ? 'outlined' : 'contained'}>{isActive ? 'Pause' : 'Start'}</Button>
                            <Button onClick={reset}>Reset</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xl={12}>
                        <TextField
                            id="productId"
                            label="Product"
                            defaultValue={product}
                            onChange={event => {
                                setProduct(event.target.value)
                            }}
                        />
                    </Grid>
                    <Grid item xl={12}>
                        <TextField
                            id="frequency"
                            label="Frequency update (ms)"
                            defaultValue={frequency}
                            onChange={event => {
                                setFrequency(Number(event.target.value))
                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default SettingsComponent
