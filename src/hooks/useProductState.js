import {useState} from "react";

export default function useProductState() {
    const getProductState = () => {
        const state = localStorage.getItem('product');
        const defaultState = {
            name: 'ETH-USD', lastPrice: 0, change: 0
        };
        return state ? JSON.parse(state) : defaultState;
    };
    const [productState, setProductState] = useState(getProductState());

    const saveProduct = (product) => {
        if (product.match("\w*\-\w*")) {
            setProductState({
                product: product,
                lastPrice: productState.lastPrice,
                change: productState.change,
            });
            localStorage.setItem('product', JSON.stringify(productState));
        }
    };

    return {
        product: productState.name,
        last: productState.lastPrice,
        change: productState.change,
        setProduct: saveProduct
    }
}
