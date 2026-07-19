import type { RowId } from "../types";

export type TableAction =
    | { type: "SET_SORT"; key: string }
    | { type: "SET_FILTER"; key: string; value: string }
    | { type: "SET_PAGE"; page: number }
    | { type: "SET_PAGE_SIZE"; size: number }
    | { type: "SET_LOADING"; value: boolean }
    | { type: "TOGGLE_ROW_SELECTION"; id: RowId }
    | { type: "TOGGLE_ALL_SELECTION"; ids: RowId[] }
    | { type: "CLEAR_SELECTION" };