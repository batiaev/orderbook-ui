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
    const [depth, setDepth] = useState(5);//ms
    const [product, setProduct] = useState("ETH-USD");
    const {orderBook, setOrderBook} = useOrderBookState();
    const [isActive, setIsActive] = useState(false);

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setOrderBook([]);
        setIsActive(false);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            const params = new URLSearchParams(window.location.search)
            let id = params.get('productId') || 'ETH-USD'
            setProduct(id);
            interval = setInterval(() => {
                OrderBookService.getOrderBook(product, depth)
                    .then((response) => {
                        setOrderBook(response.data);
                    })
            }, frequency);
        } else if (!isActive && orderBook !== []) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [setOrderBook, product, isActive, orderBook, frequency, depth]);

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
                        <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth={true}>
                            <Button onClick={toggle}
                                    variant={isActive ? 'outlined' : 'contained'}>{isActive ? 'Pause' : 'Start'}</Button>
                            <Button onClick={reset}>Reset</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xl={12}>
                        <TextField
                            id="productId"
                            label="Product"
                            fullWidth={true}
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
                            fullWidth={true}
                            defaultValue={frequency}
                            onChange={event => {
                                setFrequency(Number(event.target.value))
                            }}
                        />
                    </Grid>
                    <Grid item xl={12}>
                        <TextField
                            id="depth"
                            label="Order book depth"
                            fullWidth={true}
                            defaultValue={depth}
                            onChange={event => {
                                setDepth(Number(event.target.value))
                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default SettingsComponent
