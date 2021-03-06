import { connect } from "react-redux";
import productReducer from './reducers/product';
import productActions from './products.action';

export default (Component) => {
    return connect(productReducer, { ...productActions })(Component)
};