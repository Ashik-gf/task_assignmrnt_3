import { createContext, useContext, useReducer } from "react";
import { initialState } from "../page/Home/Home";
import searchReducer from "../reducers/searchReducer";
import taskReducers from "../reducers/taskReducer";
const searchState = ''

export const TaskContext = createContext(null)
export const TaskDispatchContext = createContext(null)
export const SearchDispatchContext = createContext(null);
export const SearchContext = createContext(null);

export default function TaskProvider({ children }) {
    const [tasks, dispatch] = useReducer(taskReducers, initialState);
    const [search, dispatchSearch] = useReducer(searchReducer, searchState)
    return (
        <TaskContext.Provider value={tasks}>
            <TaskDispatchContext.Provider value={dispatch}>
                <SearchDispatchContext.Provider value={dispatchSearch}>
                    <SearchContext.Provider value={search}>
                        {children}
                    </SearchContext.Provider>
                </SearchDispatchContext.Provider>
            </TaskDispatchContext.Provider>
        </TaskContext.Provider>
    );
}

export function useTasks() {
    return useContext(TaskContext)
}
export function useDispatch() {
    return useContext(TaskDispatchContext)
}
export function useSearchDispatch() {
    return useContext(SearchDispatchContext)
}
export function useSearch() {
    return useContext(SearchContext)
}
