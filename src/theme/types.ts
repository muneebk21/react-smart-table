export type TableThemeMode = 'light' | 'dark' | 'auto';

export interface TableThemeColors {
    text?: string;
    textMuted?: string;
    border?: string;
    borderStrong?: string;
    surface?: string;
    headerBg?: string;
    rowHover?: string;
    rowActive?: string;
    empty?: string;
    primary?: string;
    primaryHover?: string;
    primaryDisabled?: string;
    primaryText?: string;
    primaryDisabledText?: string;
    focusRing?: string;
    badgeSuccessText?: string;
    badgeSuccessBg?: string;
    badgeDangerText?: string;
    badgeDangerBg?: string;
    badgeNeutralText?: string;
    badgeNeutralBg?: string;
}

export interface TableThemeTypography {
    fontFamily?: string;
    fontSize?: string;
    lineHeight?: string | number;
}

export interface TableThemeLayout {
    radiusSm?: string;
    radiusMd?: string;
    radiusLg?: string;
    shadowSm?: string;
    shadowMd?: string;
    spacingXs?: string;
    spacingSm?: string;
    spacingMd?: string;
    spacingLg?: string;
    spacingXl?: string;
}

export interface TableTheme {
    mode?: TableThemeMode;
    colors?: TableThemeColors;
    typography?: TableThemeTypography;
    layout?: TableThemeLayout;
}

export type TableThemeInput = TableTheme | TableThemeMode;
