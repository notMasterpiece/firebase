import { NOTIFY_USER } from '../action/types';

const initilState = {
    message: null,
    mesageType: null
};


export default function (state = initilState, action) {
    switch (action.type) {
        case NOTIFY_USER :
            return {
                ...state,
                message: action.message,
                messageType: action.messageType
            };
        default:
            return state;
    }
}