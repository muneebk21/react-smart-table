import type { CSSProperties } from 'react';
import type { TableThemeColors, TableThemeLayout, TableThemeTypography } from './types';

const COLOR_VAR_MAP = {
    text: '--rst-color-text',
    textMuted: '--rst-color-text-muted',
    border: '--rst-color-border',
    borderStrong: '--rst-color-border-strong',
    surface: '--rst-color-surface',
    headerBg: '--rst-color-header-bg',
    rowHover: '--rst-color-row-hover',
    rowActive: '--rst-color-row-active',
    empty: '--rst-color-empty',
    primary: '--rst-color-primary',
    primaryHover: '--rst-color-primary-hover',
    primaryDisabled: '--rst-color-primary-disabled',
    primaryText: '--rst-color-primary-text',
    primaryDisabledText: '--rst-color-primary-disabled-text',
    focusRing: '--rst-color-focus-ring',
    badgeSuccessText: '--rst-color-badge-success-text',
    badgeSuccessBg: '--rst-color-badge-success-bg',
    badgeDangerText: '--rst-color-badge-danger-text',
    badgeDangerBg: '--rst-color-badge-danger-bg',
    badgeNeutralText: '--rst-color-badge-neutral-text',
    badgeNeutralBg: '--rst-color-badge-neutral-bg',
} as const satisfies Record<keyof TableThemeColors, string>;

const TYPOGRAPHY_VAR_MAP = {
    fontFamily: '--rst-font-family',
    fontSize: '--rst-font-size',
    lineHeight: '--rst-line-height',
} as const satisfies Record<keyof TableThemeTypography, string>;

const LAYOUT_VAR_MAP = {
    radiusSm: '--rst-radius-sm',
    radiusMd: '--rst-radius-md',
    radiusLg: '--rst-radius-lg',
    shadowSm: '--rst-shadow-sm',
    shadowMd: '--rst-shadow-md',
    spacingXs: '--rst-spacing-xs',
    spacingSm: '--rst-spacing-sm',
    spacingMd: '--rst-spacing-md',
    spacingLg: '--rst-spacing-lg',
    spacingXl: '--rst-spacing-xl',
} as const satisfies Record<keyof TableThemeLayout, string>;

function mapToCssVariables(
    values: Record<string, string | number | undefined>,
    varMap: Record<string, string>,
): CSSProperties {
    const cssVars: Record<string, string> = {};

    for (const [key, cssVar] of Object.entries(varMap)) {
        const value = values[key];
        if (value !== undefined) {
            cssVars[cssVar] = String(value);
        }
    }

    return cssVars as CSSProperties;
}

export function colorsToCssVariables(colors: TableThemeColors): CSSProperties {
    return mapToCssVariables(
        colors as Record<string, string | number | undefined>,
        COLOR_VAR_MAP,
    );
}

export function typographyToCssVariables(typography: TableThemeTypography): CSSProperties {
    return mapToCssVariables(
        typography as Record<string, string | number | undefined>,
        TYPOGRAPHY_VAR_MAP,
    );
}

export function layoutToCssVariables(layout: TableThemeLayout): CSSProperties {
    return mapToCssVariables(
        layout as Record<string, string | number | undefined>,
        LAYOUT_VAR_MAP,
    );
}

/** All CSS custom property names used by the table theme system. */
export const TABLE_THEME_CSS_VARS = [
    ...Object.values(COLOR_VAR_MAP),
    ...Object.values(TYPOGRAPHY_VAR_MAP),
    ...Object.values(LAYOUT_VAR_MAP),
] as const;
