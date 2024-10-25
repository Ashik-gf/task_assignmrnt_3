
export default function searchReducer(search, action) {
    switch (action.type) {
        case "search":
            return action.search;
        default:
            return search;
    }
}