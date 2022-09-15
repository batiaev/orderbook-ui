import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useOrderBookState} from "../hooks/useOrderBookState";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Container,
    Divider,
    IconButton,
    LinearProgress,
    ListItemIcon,
    Menu,
    MenuItem,
    Slider,
    Typography
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ViewListIcon from "@mui/icons-material/ViewList";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

const OrderBookFormats = [
    'BID',
    'ASK',
    'ALL'
]

function OrderBookComponent() {
    const [bbo, setBbo] = useState({bid: 0, ask: 0});
    const [oldMid, setOldMid] = useState(0);
    const trendUp = '🡥'
    const [trend, setTrend] = useState(trendUp) //'🡢'
    const {orderBook} = useOrderBookState();

    const [maxDepth, setMaxDepth] = React.useState(30);

    const handleMaxDepthUpdate = (event, newValue) => {
        setMaxDepth(newValue);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        orderBook.length !== 0 &&
        setBbo({
            bid: orderBook && orderBook[orderBook.length / 2].priceLevel.toFixed(2),
            ask: orderBook && orderBook[orderBook.length / 2 - 1].priceLevel.toFixed(2),
        });
        const mid = Number(((Number(bbo.ask) + Number(bbo.bid)) / 2).toFixed(2));
        setTrend(oldMid < mid ? '🡦' : trendUp);
        setOldMid(mid)
    }, [orderBook, bbo.ask, bbo.bid, oldMid])

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        <ViewListIcon/>
                    </Avatar>
                }
                action={
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreVertIcon/>
                    </IconButton>
                }
                title="Order book"
                // subheader={'ETH-USD'}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={true}
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>
                    Auto Update
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={false}
                            tabIndex={-1}
                            disableRipple
                        />
                    </ListItemIcon>
                    Show total
                </MenuItem>
                <Typography id="input-slider" padding={2} gutterBottom>
                    Max Depth = {maxDepth}
                </Typography>
                {/*<Divider>Max Depth</Divider>*/}
                <Container>
                    <Slider aria-label="Max depth" min={1} max={20} value={maxDepth} onChange={handleMaxDepthUpdate}/>
                </Container>
                <Divider>Type</Divider>
                <MenuItem onClick={handleClose}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button><ExpandLessIcon/> Bids</Button>
                        <Button><ExpandMoreIcon/> Asks</Button>
                        <Button><UnfoldLessIcon/> All</Button>
                    </ButtonGroup>
                </MenuItem>
            </Menu>
            <CardContent>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Price</TableCell>
                            <TableCell align="center">Size</TableCell>
                            <TableCell align="right" width={'100%'}>Total</TableCell>
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
                                <TableCell align="center">{row.size.toFixed(8)}</TableCell>
                                <TableCell align="right" width={'100%'}>
                                    {row.total.toFixed(8)}
                                    <LinearProgress colSpan={3} variant="determinate" value={
                                        ((row.total.toFixed(8)) * 100)
                                        / Math.max(orderBook[orderBook.length - 1].total.toFixed(8), orderBook[0].total.toFixed(8))}/>
                                </TableCell>
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
                                <TableCell align="right">{row.size.toFixed(8)}</TableCell>
                                <TableCell align="right" width={'100%'}>
                                    {row.total.toFixed(8)}
                                    <LinearProgress colSpan={3} variant="determinate" value={
                                        ((row.total.toFixed(8)) * 100)
                                        / Math.max(orderBook[orderBook.length - 1].total.toFixed(8), orderBook[0].total.toFixed(8))}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default OrderBookComponent
