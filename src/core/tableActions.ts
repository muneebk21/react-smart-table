export type TableAction =
    | { type: "SET_SORT"; key: string }
    | { type: "SET_FILTER"; key: string; value: string }
    | { type: "SET_PAGE"; page: number }
    | { type: "SET_PAGE_SIZE"; size: number }
    | { type: "SET_LOADING"; value: boolean }
    | { type: "SET_COLUMN_WIDTH"; key: string; width: number };