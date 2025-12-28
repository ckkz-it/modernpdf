# @modernpdf/core

Core client library for [ModernPDF](https://modernpdf.dev).

> [!IMPORTANT]
> This is a **client library** designed to interact with the ModernPDF API. It is not a self-contained PDF generation engine (like Puppeteer or wkhtmltopdf). It handles DOM snapshotting and API communication.

## Features

- **DOM Snapshotting**: Captures current DOM state, inlines all CSS, converts Canvases to images, and preserves input/textarea values.
- **API Wrapper**: Simple, type-safe wrapper for the ModernPDF conversion API.
- **Lightweight**: Zero dependencies, works in any modern browser.

## Installation

```bash
npm install @modernpdf/core
# or
pnpm add @modernpdf/core
# or
yarn add @modernpdf/core
```

## Usage

### 1. Generating a PDF from a URL

If you just want to convert a public URL to a PDF:

```typescript
import { generatePdf } from '@modernpdf/core';

async function downloadPage() {
  const blob = await generatePdf({
    source: { url: 'https://example.com' },
    pdf: { format: 'A4' },
  });

  // Do something with the blob (e.g., save it or open in new tab)
  const url = URL.createObjectURL(blob);
  window.open(url);
}
```

### 2. Snapshotting the current page

This is useful for generating PDFs of dynamic web apps, dashboards, or "Save as PDF" buttons where you want to capture exactly what the user sees.

```typescript
import { snapshotElement, generatePdf } from '@modernpdf/core';

async function exportToPdf() {
  // 1. Capture the HTML and styles of the current page (or a specific element)
  const html = await snapshotElement(document.getElementById('report-container'));

  // 2. Send it to ModernPDF API for conversion
  const blob = await generatePdf({
    source: { html },
    pdf: {
      format: 'A4',
      margin: { top: '1cm', bottom: '1cm' },
    },
  });

  // 3. Download the result
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'report.pdf';
  a.click();
}
```

## API Reference

### `snapshotElement(rootElement?: HTMLElement): Promise<string>`

Captures the current state of a DOM element (defaults to `document.documentElement`).

- Inlines all external and internal CSS.
- Converts `<canvas>` elements to `<img>` tags.
- Inlines current values of `<input>`, `<textarea>`, and `<select>`.
- Removes `<script>` tags to ensure a static snapshot.

### `generatePdf(request: GeneratePdfRequest, apiUrl?: string): Promise<Blob>`

Sends a request to the ModernPDF API.

- `request.source`: Either `{ url: string }` or `{ html: string }`.
- `request.pdf`: Options like `format`, `landscape`, `margin`, `scale`, etc.
- `request.wait`: Wait conditions (e.g., `networkidle`, `selector`).

## License

MIT
