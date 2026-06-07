import type { TableThemeColors, TableThemeLayout, TableThemeTypography } from './types';

export const lightThemeColors: Required<TableThemeColors> = {
    text: '#1e293b',
    textMuted: '#64748b',
    border: '#e2e8f0',
    borderStrong: '#cbd5e1',
    surface: '#ffffff',
    headerBg: '#f8fafc',
    rowHover: '#f1f5f9',
    rowActive: '#e2e8f0',
    empty: '#94a3b8',
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    primaryDisabled: '#cbd5e1',
    primaryText: '#ffffff',
    primaryDisabledText: '#f8fafc',
    focusRing: 'rgba(59, 130, 246, 0.35)',
    badgeSuccessText: '#166534',
    badgeSuccessBg: '#dcfce7',
    badgeDangerText: '#991b1b',
    badgeDangerBg: '#fee2e2',
    badgeNeutralText: '#475569',
    badgeNeutralBg: '#f1f5f9',
};

export const darkThemeColors: Required<TableThemeColors> = {
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    border: '#334155',
    borderStrong: '#475569',
    surface: '#1e293b',
    headerBg: '#0f172a',
    rowHover: '#334155',
    rowActive: '#475569',
    empty: '#64748b',
    primary: '#60a5fa',
    primaryHover: '#3b82f6',
    primaryDisabled: '#475569',
    primaryText: '#0f172a',
    primaryDisabledText: '#94a3b8',
    focusRing: 'rgba(96, 165, 250, 0.35)',
    badgeSuccessText: '#86efac',
    badgeSuccessBg: '#14532d',
    badgeDangerText: '#fca5a5',
    badgeDangerBg: '#7f1d1d',
    badgeNeutralText: '#cbd5e1',
    badgeNeutralBg: '#334155',
};

export const defaultThemeTypography: Required<TableThemeTypography> = {
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    fontSize: '0.875rem',
    lineHeight: 1.5,
};

export const defaultThemeLayout: Required<TableThemeLayout> = {
    radiusSm: '0.375rem',
    radiusMd: '0.5rem',
    radiusLg: '0.75rem',
    shadowSm: '0 1px 2px rgba(15, 23, 42, 0.06)',
    shadowMd:
        '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)',
    spacingXs: '0.25rem',
    spacingSm: '0.5rem',
    spacingMd: '0.75rem',
    spacingLg: '1rem',
    spacingXl: '1.5rem',
};

export const darkThemeLayout: Required<TableThemeLayout> = {
    ...defaultThemeLayout,
    shadowSm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
};
