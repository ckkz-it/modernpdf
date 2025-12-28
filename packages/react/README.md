# @modernpdf/react

React hook for [ModernPDF](https://modernpdf.dev).

> [!IMPORTANT]
> This is a **client library** designed to interact with the ModernPDF API. It is not a self-contained PDF generation engine. It provides a convenient React hook to capture DOM snapshots and generate PDFs via the ModernPDF API.

## Installation

```bash
npm install @modernpdf/react
# or
pnpm add @modernpdf/react
# or
yarn add @modernpdf/react
```

## Usage

The `useSnapshot` hook manages the loading and error states for you.

```tsx
import { useSnapshot } from '@modernpdf/react';

export const ExportButton = () => {
  const { takeSnapshot, isLoading, error } = useSnapshot();

  const handleExport = async () => {
    try {
      const blob = await takeSnapshot({
        // Optional: specify a root element to snapshot only a part of the page
        // rootElement: document.getElementById('my-dashboard'),
        pdf: {
          format: 'A4',
          margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
        },
      });

      // Simple way to download the file
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'snapshot.pdf';
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  return (
    <div>
      <button onClick={handleExport} disabled={isLoading}>
        {isLoading ? 'Generating PDF...' : 'Download PDF Snapshot'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
};
```

## API

### `useSnapshot()`

Returns an object with:

- `takeSnapshot(options?)`: An async function that captures the DOM and returns a PDF `Blob`.
  - `options.rootElement`: The element to snapshot (defaults to `document.documentElement`).
  - `options.pdf`: format, margin, etc - see types for reference.
  - `options.wait`: Wait conditions for the API.
- `isLoading`: Boolean state indicating if the generation is in progress.
- `error`: Error object if the last request failed.

## License

MIT
