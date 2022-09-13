import React, {createContext, useContext, useMemo, useState} from "react";

const orderBookInitialState = {orderBook: [], setOrderBook: undefined};

const OrderBookStateContext = createContext(orderBookInitialState);

export const OrderBookStateProvider = ({children}) => {
    const [orderBook, setOrderBook] = useState(orderBookInitialState.orderBook);
    const orderBookContextValue = useMemo(() => ({orderBook, setOrderBook}), [orderBook]);

    return (
        <OrderBookStateContext.Provider value={orderBookContextValue}>
            {children}
        </OrderBookStateContext.Provider>
    )
}

export const useOrderBookState = () => useContext(OrderBookStateContext);
