export default function (state = false, action) {
    switch (action.type) {
        case "ADD_FOCUS":
            return action.payload;
        default:
            return state;
    }
}