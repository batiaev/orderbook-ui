import React, {useEffect, useState} from 'react';
import {
    Autocomplete,
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    ListItemAvatar,
    TextField
} from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OrderBookService from "../services/OrderBookService";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
// import useProductState from "../hooks/useProductState";

function AssetStateComponent() {
    // const {product} = useProductState();
    const [products, setProducts] = useState(['ETH-USD']);
    const titles = {
        component: 'Market',
    }

    function updateProducts() {
        OrderBookService.getProducts()
            .then((response) => {
                setProducts(response.data);
            })
    }

    useEffect(() => {
        updateProducts()
    });

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        <FormatListBulletedIcon/>
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
                    <Grid item md={12}>
                        <Autocomplete
                            // freeSolo
                            id="free-solo-2-demo"
                            // disableClearable
                            options={products ? products.map((pr) => pr) : []}
                            onChange={() => {
                                updateProducts()
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search input"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <List>
                            {products.map((row) => (
                                <ListItem disablePadding key={row}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <InboxIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={row}  secondary="1237.34"/>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default AssetStateComponent
