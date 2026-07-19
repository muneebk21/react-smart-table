// Main component (default styles are bundled via side-effect import in SmartTable)
export { SmartTable } from './components/SmartTable';

// Types
export type {
    Column,
    SortConfig,
    FilterConfig,
    SmartTableProps,
    RowId,
} from './types';

// Theme system
export type {
    TableTheme,
    TableThemeInput,
    TableThemeMode,
    TableThemeColors,
    TableThemeTypography,
    TableThemeLayout,
    ResolvedTableTheme,
} from './theme';

export {
    lightThemeColors,
    darkThemeColors,
    defaultThemeTypography,
    defaultThemeLayout,
    darkThemeLayout,
    colorsToCssVariables,
    typographyToCssVariables,
    layoutToCssVariables,
    TABLE_THEME_CSS_VARS,
    resolveTableTheme,
} from './theme';

// Hooks (if you want to expose them)
export { useSort } from './hooks/useSort';
export { useFilter } from './hooks/useFilter';
export { usePagination } from './hooks/usePagination';
