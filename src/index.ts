// Main component
export { SmartTable } from './components/SmartTable';

// Types
export type {
    Column,
    SortConfig,
    FilterConfig,
    SmartTableProps
} from './types';

// Hooks (if you want to expose them)
export { useSort } from './hooks/useSort';
export { useFilter } from './hooks/useFilter';
export { usePagination } from './hooks/usePagination';