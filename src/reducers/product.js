import { FETCH_DATA } from '../ActionType';


var products = (state = {}, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return { ...state, JsonList: action.payload };
        default:
            return state;
    };
};

export default products;
