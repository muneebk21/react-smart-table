import { useReducer } from "react";
import { tableReducer } from "../core/tableReducer";
import { createInitialTableState } from "../core/tableState";

export function useTableState(
    pageSize: number,
    columnKeys: string[]
) {
    const [state, dispatch] = useReducer(
        tableReducer,
        createInitialTableState(pageSize, columnKeys)
    );

    return { state, dispatch };
}