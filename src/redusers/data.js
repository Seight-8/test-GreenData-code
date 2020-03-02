const initialState = [];

export default function data(state = initialState, action) {
    switch (action.type){
        case 'ADD_DATA':
            return [
                ...state,
                action.payload
            ];
        case 'DELETE':
                document.querySelectorAll('.add')[0].removeAttribute('disabled');
                const index = state.findIndex(({id}) => id === action.payload.id)
            return[
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ]
        case 'UPDATE':
        {
            const index = state.findIndex(({id}) => id === action.payload.id)
            return[
                ...state.slice(0, index),
                action.payload,
                ...state.slice(index + 1)
            ]
        }
        default:
            return state;
    }
}