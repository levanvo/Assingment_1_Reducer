import React, { createContext, useReducer } from 'react';
import { produce } from "immer";
import axios from "axios";


export const Share = createContext({} as any);
export const instance=axios.create({
    baseURL:"http://localhost:3456/",
});
const Initial = {
    data: [] as any,
};

const Handle = (state: any, action: any) => {
    switch (action.type) {
        case "fetchAPI":
            state.data = action.payload;
            return;
        case "addPr":
            state.data.push(action.payload);
            return;
        case "updatePr":
            state.data = state.data.map((items: any) => items.id == action.payload.id ? action.payload : items);
            return;
        case "removePr":
            state.data = state.data.filter((items: any) => items.id != action.payload);
            return;
        default:
            return state;
    };
};

const ShareReducer = ({ children }: any) => {
    const [state, dispatch] = useReducer(produce(Handle), Initial);

    return (
        <Share.Provider value={{ state, dispatch }}>
            {children}
        </Share.Provider>
    );
};

export default ShareReducer
