import React, {useState} from 'react';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    Menu,
    Radio,
    RadioGroup
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DepthChartWidget from "./widgets/DepthChartWidget";
import LineChartWidget from "./widgets/LineChartWidget";
import CandleStickChartWidget from "./widgets/CandleStickChartWidget";

export default function ChartComponent({defaultType = 'depth'}) {

    const [type, setType] = useState(defaultType);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        <BarChartIcon/>
                    </Avatar>
                }
                action={
                    <IconButton
                        id="basic-button"
                        aria-label="settings"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={type === 'depth' ? "Depth chart" : type === 'candle' ? 'Candle stick chart' : 'Line chart'}
                // subheader={new Date().toDateString()}
            />
            <CardContent>
                {type === 'depth' && <DepthChartWidget/>}
                {type === 'candle' && <CandleStickChartWidget/>}
                {type === 'line' && <LineChartWidget/>}
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <Container>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Chart type</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={type}
                                name="radio-buttons-group"
                                onChange={(event, value) => setType(value)}
                            >
                                <FormControlLabel value="depth" control={<Radio/>} label="Depth"/>
                                <FormControlLabel value="candle" control={<Radio/>} label="Candle"/>
                                <FormControlLabel value="line" control={<Radio/>} label="Line"/>
                            </RadioGroup>
                        </FormControl>
                    </Container>
                </Menu>
            </CardContent>
        </Card>
    );
}
