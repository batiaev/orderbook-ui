import React, {useState} from 'react';
import Button from '@mui/material/Button';
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
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [side, setSide] = useState('buy');

    const handleOrderSide = (
        event: React.MouseEvent<HTMLElement>,
        newSide: string,
    ) => {
        setSide(newSide);
    };

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
                            onChange={handleOrderSide}
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
                            defaultValue={123}
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
                            defaultValue={234}
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
