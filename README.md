# react-smart-table

A lightweight, fully typed React data table with sorting, filtering, pagination, row interactions, and a built-in theming system (light, dark, and system mode).

## Installation

```bash
npm install @mkforgeui/react-smart-table
```

**Peer dependencies:** React 18 or 19.

Styles are included automatically when you import `SmartTable` — no separate CSS import is required in most bundlers (Vite, Webpack, etc.).

If your setup does not pick up side-effect CSS imports, load styles manually:

```tsx
import '@mkforgeui/react-smart-table/styles.css';
import { SmartTable } from '@mkforgeui/react-smart-table';
```

## Quick start

```tsx
import { SmartTable, type Column } from '@mkforgeui/react-smart-table';

interface User {
  id: number;
  name: string;
  email: string;
}

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

const columns: Column<User>[] = [
  { key: 'id', header: 'ID', width: '80px', sortable: true },
  { key: 'name', header: 'Name', sortable: true, filterable: true },
  { key: 'email', header: 'Email', sortable: true, filterable: true },
];

export function UsersTable() {
  return <SmartTable data={data} columns={columns} />;
}
```

## Column definition

Each column is configured with a `Column<T>` object:

| Property     | Type                                      | Description                                      |
| ------------ | ----------------------------------------- | ------------------------------------------------ |
| `key`        | `keyof T \| string`                       | Field key used for sorting, filtering, and display |
| `header`     | `string`                                  | Column header label                              |
| `sortable`   | `boolean`                                 | Enable sorting for this column                   |
| `filterable` | `boolean`                                 | Show a text filter input in the header           |
| `width`      | `string \| number`                        | Column width (e.g. `'120px'`)                    |
| `align`      | `'left' \| 'center' \| 'right'`            | Cell and header alignment                        |
| `render`     | `(value, row) => React.ReactNode`         | Custom cell renderer                             |

### Custom cell rendering

```tsx
{
  key: 'status',
  header: 'Status',
  render: (value: string) => (
    <span className={`rst-badge rst-badge--${value === 'active' ? 'success' : 'danger'}`}>
      {value}
    </span>
  ),
}
```

Built-in badge classes: `rst-badge--success`, `rst-badge--danger`, `rst-badge--neutral`. These respect the active theme.

## SmartTable props

| Prop            | Type                         | Default               | Description                          |
| --------------- | ---------------------------- | --------------------- | ------------------------------------ |
| `data`          | `T[]`                        | —                     | Row data (required)                  |
| `columns`       | `Column<T>[]`                | —                     | Column definitions (required)        |
| `sortable`      | `boolean`                    | `true`                | Enable sorting globally              |
| `filterable`    | `boolean`                    | `true`                | Enable filtering globally            |
| `pagination`    | `boolean`                    | `false`               | Enable pagination                    |
| `itemsPerPage`  | `number`                     | `10`                  | Rows per page when pagination is on  |
| `theme`         | `TableThemeInput`            | `'light'`             | Theme preset or custom theme object  |
| `className`     | `string`                     | `''`                  | Extra class on the table root        |
| `style`         | `React.CSSProperties`        | —                     | Inline styles on the table root      |
| `onRowClick`    | `(row: T) => void`           | —                     | Called when a row is clicked         |
| `emptyMessage`  | `string`                     | `'No data available'` | Message shown when `data` is empty   |

## Features

### Sorting

Click a sortable column header to toggle ascending / descending order. Set `sortable={false}` on the table or `sortable: false` on individual columns to disable it.

### Filtering

Columns with `filterable: true` show a search input in the header. Filtering is case-insensitive and matches partial values.

### Pagination

```tsx
<SmartTable
  data={data}
  columns={columns}
  pagination
  itemsPerPage={10}
/>
```

Pagination controls appear only when there is more than one page.

### Row click

```tsx
<SmartTable
  data={data}
  columns={columns}
  onRowClick={(row) => console.log(row)}
/>
```

## Theming

`react-smart-table` ships with light and dark presets, system-mode support, and full control over colors, typography, and layout via CSS variables.

### Preset modes

```tsx
<SmartTable theme="light" data={data} columns={columns} />
<SmartTable theme="dark"  data={data} columns={columns} />
<SmartTable theme="auto"  data={data} columns={columns} />  {/* follows OS preference */}
```

### Custom theme object

Override any token on top of a preset:

```tsx
<SmartTable
  data={data}
  columns={columns}
  theme={{
    mode: 'dark',
    colors: {
      primary: '#7c3aed',
      primaryHover: '#6d28d9',
      surface: '#18181b',
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
    layout: {
      radiusLg: '1rem',
    },
  }}
/>
```

### Color tokens

| Token                  | CSS variable                         |
| ---------------------- | ------------------------------------ |
| `text`                 | `--rst-color-text`                   |
| `textMuted`            | `--rst-color-text-muted`             |
| `border`               | `--rst-color-border`                 |
| `borderStrong`         | `--rst-color-border-strong`          |
| `surface`              | `--rst-color-surface`                |
| `headerBg`             | `--rst-color-header-bg`              |
| `rowHover`             | `--rst-color-row-hover`              |
| `rowActive`            | `--rst-color-row-active`             |
| `empty`                | `--rst-color-empty`                  |
| `primary`              | `--rst-color-primary`                |
| `primaryHover`         | `--rst-color-primary-hover`          |
| `primaryDisabled`      | `--rst-color-primary-disabled`       |
| `primaryText`          | `--rst-color-primary-text`           |
| `primaryDisabledText`  | `--rst-color-primary-disabled-text`  |
| `focusRing`            | `--rst-color-focus-ring`             |
| `badgeSuccessText`     | `--rst-color-badge-success-text`     |
| `badgeSuccessBg`       | `--rst-color-badge-success-bg`       |
| `badgeDangerText`      | `--rst-color-badge-danger-text`      |
| `badgeDangerBg`        | `--rst-color-badge-danger-bg`        |
| `badgeNeutralText`     | `--rst-color-badge-neutral-text`     |
| `badgeNeutralBg`       | `--rst-color-badge-neutral-bg`       |

### Override via CSS

Target the root element with `className` or a wrapper:

```css
.my-table {
  --rst-color-primary: #10b981;
  --rst-color-surface: #111827;
  --rst-radius-lg: 1rem;
}
```

```tsx
<SmartTable className="my-table" data={data} columns={columns} theme="dark" />
```

### Theme utilities

For advanced setups, import helpers and default palettes:

```tsx
import {
  lightThemeColors,
  darkThemeColors,
  colorsToCssVariables,
  TABLE_THEME_CSS_VARS,
  resolveTableTheme,
} from 'react-smart-table';
```

`TABLE_THEME_CSS_VARS` lists every CSS variable name the package uses.

## Hooks

The table logic is also available as standalone hooks if you want to build a custom UI:

```tsx
import { useSort, useFilter, usePagination } from 'react-smart-table';

const { filteredData, filters, setFilter } = useFilter(data);
const { sortedData, sortConfig, requestSort } = useSort(filteredData);
const { paginatedData, currentPage, totalPages, nextPage, previousPage } =
  usePagination(sortedData, 10);
```

## TypeScript

All types are exported from the package:

```tsx
import type {
  Column,
  SmartTableProps,
  SortConfig,
  FilterConfig,
  TableTheme,
  TableThemeMode,
  TableThemeColors,
} from 'react-smart-table';
```

## Local development

Clone the repo and run the interactive demo:

```bash
git clone https://github.com/muneebk21/react-smart-table.git
cd react-smart-table
npm install
npm run dev
```

The demo includes theme switching (light / dark / system) and a custom brand-color example.

### Build the library

```bash
npm run build
```

This emits the publishable package to `dist/`:

| File                    | Purpose                          |
| ----------------------- | -------------------------------- |
| `react-smart-table.js`  | ES module entry                  |
| `index.d.ts`            | TypeScript declarations          |
| `styles.css`            | Default table styles             |

## License

MIT
