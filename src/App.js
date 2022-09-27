import './App.css';
import OrderBookComponent from "./components/OrderBookComponent";
import DepthChartComponent from "./components/charts/DepthChartComponent";
import {Container, Grid} from "@mui/material";
import {OrderBookStateProvider} from "./hooks/useOrderBookState";
import SettingsComponent from "./components/SettingsComponent";
import NewOrderComponent from "./components/NewOrderComponent";
import AssetStateComponent from "./components/AssetStateComponent";
import MarketComponent from "./components/MarketComponent";
import CandleStickChartComponent from "./components/charts/CandleStickChartComponent";
import LineChartComponent from "./components/charts/LineChartComponent";

function App() {
    return (
        <div className="App">
            <br/>
            <Container maxWidth="xl">
                <OrderBookStateProvider>
                    <Grid container spacing={2} margin={2}>
                        <Grid item md={3}>
                            <OrderBookComponent/>
                        </Grid>
                        <Grid item md={6}>
                            <Grid container item spacing={2}
                                  direction="column">
                                <Grid item md={3}>
                                    <AssetStateComponent/>
                                </Grid>
                                <Grid item md={3}>
                                    <DepthChartComponent/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container item md={3} spacing={2}
                              direction="column">
                            <Grid item md={3}>
                                <SettingsComponent/>
                            </Grid>
                            <Grid item md={3}>
                                <NewOrderComponent/>
                            </Grid>
                        </Grid>
                        <Grid item md={3}>
                            <MarketComponent/>
                        </Grid>
                        <Grid container item md={6} spacing={2}
                              direction="column">
                            <Grid item>
                                <LineChartComponent/>
                            </Grid>
                            <Grid item>
                                <CandleStickChartComponent/>
                            </Grid>
                        </Grid>
                    </Grid>
                </OrderBookStateProvider>
            </Container>
        </div>
    )
}

export default App;
