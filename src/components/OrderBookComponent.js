import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useOrderBookState} from "../hooks/useOrderBookState";
import {Avatar, Card, CardContent, CardHeader, IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ViewListIcon from "@mui/icons-material/ViewList";

function OrderBookComponent() {
    const [bbo, setBbo] = useState({bid: 0, ask: 0});
    const [oldMid, setOldMid] = useState(0);
    const trendUp = '🡥'
    const [trend, setTrend] = useState(trendUp) //'🡢'
    const {orderBook} = useOrderBookState();

    useEffect(() => {
        orderBook.length !== 0 &&
        setBbo({
            bid: orderBook && orderBook[orderBook.length / 2].priceLevel.toFixed(2),
            ask: orderBook && orderBook[orderBook.length / 2 - 1].priceLevel.toFixed(2),
        });
        const mid = Number(((Number(bbo.ask) + Number(bbo.bid)) / 2).toFixed(2));
        setTrend(oldMid < mid ? '🡦' : trendUp);
        setOldMid(mid)
    }, [orderBook])

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        <ViewListIcon/>
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title="Order book"
                // subheader={'ETH-USD'}
            />
            <CardContent>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Price</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell align="right">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderBook.map((row) => (
                            row.side === 'SELL' && <TableRow
                                key={row.price}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row"
                                           style={{color: (row.side === 'BUY' ? 'green' : 'red')}}>
                                    {row.priceLevel.toFixed(2)}
                                </TableCell>
                                <TableCell>{row.size.toFixed(8)}</TableCell>
                                <TableCell align="right">{row.total.toFixed(8)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow
                            key={'mid'}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell colSpan={3} component="th" scope="row" align={"center"}
                                       style={{color: (trend === trendUp ? 'green' : 'red')}}>
                                {((Number(bbo.ask) + Number(bbo.bid)) / 2).toFixed(2)} {trend} (
                                spread: {(bbo.ask - bbo.bid).toFixed(2)})
                            </TableCell>
                        </TableRow>
                        {orderBook.map((row) => (
                            row.side === 'BUY' && <TableRow
                                key={row.price}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row"
                                           style={{color: (row.side === 'BUY' ? 'green' : 'red')}}>
                                    {row.priceLevel.toFixed(2)}
                                </TableCell>
                                <TableCell>{row.size.toFixed(8)}</TableCell>
                                <TableCell align="right">{row.total.toFixed(8)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default OrderBookComponent
