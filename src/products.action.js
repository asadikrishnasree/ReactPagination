import { FETCH_DATA } from './ActionType';

export default {
    setJsonData(item) {
        return (dispatch) => {
            dispatch({ type: FETCH_DATA, payload: item });
        }
    },
};
