import type { TableAction } from "./tableActions";
import type { TableState } from "./tableState";

export function tableReducer(
    state: TableState,
    action: TableAction
): TableState {
    switch (action.type) {
        case "SET_SORT": {
            const isSame = state.sort.key === action.key;
            return {
                ...state,
                sort: {
                    key: action.key,
                    direction:
                        isSame && state.sort.direction === "asc"
                            ? "desc"
                            : "asc",
                },
                pagination: {
                    ...state.pagination,
                    page: 1,
                },
            };
        }
        case "SET_FILTER":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.key]: action.value,
                },
                pagination: {
                    ...state.pagination,
                    page: 1,
                },
            };

        case "SET_PAGE":
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: action.page,
                },
            };
        case "SET_PAGE_SIZE":
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    pageSize: action.size,
                    page: 1,
                },
            };

        case "SET_COLUMN_WIDTH":
            return {
                ...state,
                columnWidths: {
                    ...state.columnWidths,
                    [action.key]: action.width,
                },
            };

        case "SET_LOADING":
            return {
                ...state,
                loading: action.value,
            };

        default:
            return state;
    }
}