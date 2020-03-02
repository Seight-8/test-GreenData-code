export default function (state=null, action) {
    switch (action.type) {
        case "SELECTOR":
            return action.payload;
        default:
            return state;
    }
}