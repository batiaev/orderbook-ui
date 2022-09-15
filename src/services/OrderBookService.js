import axios from 'axios'

const ROOT = 'http://localhost:4568';
const ORDERBOOK_API = ROOT + '/orderbooks';
const PRODUCTS_API = ROOT + '/products';

class OrderBookService {

    getProducts() {
        return axios.get(PRODUCTS_API);
    }

    getOrderBooks() {
        return axios.get(ORDERBOOK_API);
    }

    getOrderBook(product: string, depth: number = 5) {
        return axios.get(ORDERBOOK_API + '/' + product + '?depth=' + depth);
    }
}

export default new OrderBookService();
