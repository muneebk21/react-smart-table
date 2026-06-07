import type { CSSProperties } from 'react';
import { colorsToCssVariables, layoutToCssVariables, typographyToCssVariables } from './cssVariables';
import type { TableTheme, TableThemeInput, TableThemeMode } from './types';

export interface ResolvedTableTheme {
    mode: TableThemeMode;
    cssVariables: CSSProperties;
    hasCustomTokens: boolean;
}

function normalizeThemeInput(theme?: TableThemeInput): TableTheme {
    if (!theme) {
        return { mode: 'light' };
    }

    if (typeof theme === 'string') {
        return { mode: theme };
    }

    return theme;
}

export function resolveTableTheme(theme?: TableThemeInput): ResolvedTableTheme {
    const normalized = normalizeThemeInput(theme);
    const mode = normalized.mode ?? 'light';

    const cssVariables: CSSProperties = {
        ...colorsToCssVariables(normalized.colors ?? {}),
        ...typographyToCssVariables(normalized.typography ?? {}),
        ...layoutToCssVariables(normalized.layout ?? {}),
    };

    return {
        mode,
        cssVariables,
        hasCustomTokens: Object.keys(cssVariables).length > 0,
    };
}
