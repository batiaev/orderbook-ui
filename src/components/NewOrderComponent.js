import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {useOrderBookState} from "../hooks/useOrderBookState";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Tab,
    Tabs,
    TextField,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function NewOrderComponent() {
    const [value, setValue] = useState(0);

    const [lastPrice, setLastPrice] = useState(0);
    const [stop, setStop] = useState(0);
    const [limit, setLimit] = useState(0);
    const {orderBook} = useOrderBookState();

    useEffect(() => {
        const mid = orderBook.length === 0 ? 0 : ((orderBook[orderBook.length / 2].priceLevel
            + orderBook[orderBook.length / 2 - 1].priceLevel) / 2).toFixed(2);
        setLastPrice(mid)
        if (value < 1) {
            setLimit(mid)
        }
        if (value <= 1) {
            setStop((mid * 0.95).toFixed(2))
        }
    }, [orderBook, lastPrice])

    const textType = () => {
        let type;
        switch (value) {
            case 0:
                type = 'Market'
                break;
            case 1:
                type = 'Limit'
                break;
            default:
                type = 'Stop'
        }
        return type;
    }
    // @ts-ignore
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [side, setSide] = useState('buy');

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        <AddCircleOutlineIcon/>
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title="New order"
                // subheader={'ETH-USD'}
            />
            <CardContent>

                <Grid container spacing={2} padding={2}>
                    <Grid item xs={12}>
                        <ToggleButtonGroup
                            color="primary"
                            value={side}
                            exclusive
                            onChange={(event, newSide) => setSide(newSide || side)}
                            aria-label="Order side"
                            fullWidth={true}
                        >
                            <ToggleButton color={"success"} value="buy"><TrendingUpIcon/> Buy</ToggleButton>
                            <ToggleButton color={"error"} value="sell">Sell <TrendingDownIcon/></ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="Market"/>
                            <Tab label="Limit"/>
                            <Tab label="Stop"/>
                            {/*<Tab icon={<MoreVertIcon/>}/>*/}
                        </Tabs>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth={true}
                            id="amount"
                            label="Amount"
                            defaultValue={1}
                            onChange={event => {
                                // setProduct(event.target.value)
                            }}
                        />
                    </Grid>
                    <Grid item xs={value === 2 ? 6 : 12}>
                        <TextField
                            fullWidth={true}
                            id="limit"
                            label={(value === 0 ? "Market" : "Limit") + " Price"}
                            disabled={value === 0}
                            defaultValue={limit}
                            value={limit}
                            onChange={event => {
                                // setProduct(event.target.value)
                            }}
                        />
                    </Grid>
                    {value === 2 && <Grid item xs={6}>
                        <TextField
                            id="stop"
                            label="Stop Price"
                            // disabled={value !== 2}
                            defaultValue={stop}
                            value={stop}
                            onChange={event => {
                                // setProduct(event.target.value)
                            }}
                        />
                    </Grid>}
                    <Grid item xs={12}>
                        <Button fullWidth={true} variant="outlined">Place {side} {textType()} Order</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default NewOrderComponent
