import './App.css';
import OrderBookComponent from "./components/OrderBookComponent";
import DepthChartComponent from "./components/DepthChartComponent";
import {Container, Grid} from "@mui/material";
import {OrderBookStateProvider} from "./hooks/useOrderBookState";
import SettingsComponent from "./components/SettingsComponent";
import NewOrderComponent from "./components/NewOrderComponent";

function App() {
    return (
        <div className="App">
            <br/>
            <Container maxWidth="xl">
                <OrderBookStateProvider>
                    <Grid container spacing={2} margin={2}>
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
                            <OrderBookComponent/>
                        </Grid>
                        <Grid item md={6}>
                            <DepthChartComponent/>
                        </Grid>
                    </Grid>
                </OrderBookStateProvider>
            </Container>
        </div>
    )
}

export default App;
