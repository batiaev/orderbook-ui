import React, {useEffect, useState} from 'react';
import {useOrderBookState} from "../hooks/useOrderBookState";
import {Avatar, Card, CardContent, CardHeader, Grid, IconButton, Typography} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InfoIcon from '@mui/icons-material/Info';

function AssetStateComponent() {
    const [stats, setStats] = useState({last: 0, change: 0, high: 0, low: 0, volume: 0, init: 0});
    const [product] = useState("ETH-USD");
    const {orderBook} = useOrderBookState();

    const titles = {
        component: 'Asset info',
        market: 'Coinbase',
        lastPrice: 'Last price',
        change: '24h Change',
        high: '24h High',
        low: '24h Low',
        volume: '24h Volume'
    }

    useEffect(() => {
        const mid = orderBook.length === 0 ? 0 : ((orderBook[orderBook.length / 2].priceLevel
            + orderBook[orderBook.length / 2 - 1].priceLevel) / 2).toFixed(2);
        const min = stats.low === 0 ? mid : Math.min(stats.low, mid);
        const max = stats.high === 0 ? mid : Math.max(stats.high, mid);
        const init = stats.init === 0 ? mid : stats.init;
        setStats({
            last: mid,
            high: max,
            low: min,
            init: init,
            change: (mid - init).toFixed(2),
            volume: 0
        })
    }, [orderBook, stats.high, stats.init, stats.low])

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        <InfoIcon/>
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={titles.component}
                // subheader={product}
            />
            <CardContent>
                <Grid container spacing={2} padding={2}>
                    <Grid item md={2}>
                        <Typography variant="h5" style={{marginTop: '-15px'}} gutterBottom>
                            {product}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {titles.market}
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Typography variant="h5" style={{marginTop: '-15px'}} gutterBottom>
                            {stats.last}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {titles.lastPrice}
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Typography variant="button" gutterBottom>
                            {stats.change}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {titles.change}
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Typography variant="button" gutterBottom>
                            {stats.high}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {titles.high}
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Typography variant="button" gutterBottom>
                            {stats.low}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {titles.low}
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Typography variant="button" gutterBottom>
                            {stats.volume}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {titles.volume}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default AssetStateComponent
