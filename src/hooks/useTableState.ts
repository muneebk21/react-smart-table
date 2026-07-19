import { useReducer } from "react";
import { tableReducer } from "../core/tableReducer";
import { createInitialTableState } from "../core/tableState";

export function useTableState(pageSize: number) {
    const [state, dispatch] = useReducer(
        tableReducer,
        createInitialTableState(pageSize)
    );

    return { state, dispatch };
}