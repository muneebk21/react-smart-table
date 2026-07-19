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

        case "SET_LOADING":
            return {
                ...state,
                loading: action.value,
            };

        case "TOGGLE_ROW_SELECTION": {
            const next = new Set(state.selectedRowIds);
            if (next.has(action.id)) next.delete(action.id);
            else next.add(action.id);
            return { ...state, selectedRowIds: next };
        }

        case "TOGGLE_ALL_SELECTION": {
            const allSelected = action.ids.every((id) => state.selectedRowIds.has(id));
            const next = new Set(state.selectedRowIds);
            for (const id of action.ids) {
                if (allSelected) next.delete(id);
                else next.add(id);
            }
            return { ...state, selectedRowIds: next };
        }

        case "CLEAR_SELECTION":
            return { ...state, selectedRowIds: new Set() };

        default:
            return state;
    }
}