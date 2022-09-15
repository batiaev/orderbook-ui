import {useState} from "react";

// interface Product {
//     name: string,
//     lastPrice: number,
//     change: number,
// }

export default function useProductState() {
    const getProductState = () => {
        const state = localStorage.getItem('product');
        const defaultState = {
            name: 'ETH-USD',
            lastPrice: 0,
            change: 0
        };
        return state ? JSON.parse(state) : defaultState;
    };
    const [productState, setProductState] = useState(getProductState());

    console.log(productState)
    const saveProduct = (product) => {
        localStorage.setItem('product', JSON.stringify(product));
        setProductState(product);
    };

    return {
        product: productState,
        setProduct: saveProduct
    }
}
