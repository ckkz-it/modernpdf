# ModernPDF

ModernPDF is a high-performance PDF generation SDK that allows you to capture DOM snapshots and convert them into high-quality PDFs using ModernPDF API.

## Features

- 📸 **Smart Snapshots**: Captures DOM state including inlined CSS, Canvas elements as images, and preserved input values.
- ⚛️ **React First**: Dedicated React hook for seamless integration.
- 📦 **Monorepo Design**: Light-weight core library and framework-specific wrappers.

## Monorepo Structure

- [`@modernpdf/core`](./packages/core): Core logic for DOM snapshotting and API communication.
- [`@modernpdf/react`](./packages/react): React hook (`useSnapshot`) for easy integration.

## Installation

```bash
pnpm add @modernpdf/react @modernpdf/core
# or
npm install @modernpdf/react @modernpdf/core
```

## Usage

### React

```tsx
import { useSnapshot } from '@modernpdf/react';

function MyComponent() {
  const { takeSnapshot, isLoading, error } = useSnapshot();

  const handleDownload = async () => {
    const pdfBlob = await takeSnapshot({
      pdf: { format: 'A4', printBackground: true },
    });

    // Download or process the blob
    const url = URL.createObjectURL(pdfBlob);
    window.open(url);
  };

  return (
    <button onClick={handleDownload} disabled={isLoading}>
      {isLoading ? 'Generating...' : 'Download PDF'}
    </button>
  );
}
```

### Vanilla JavaScript

```typescript
import { snapshotElement, generatePdf } from '@modernpdf/core';

async function createButtonPdf() {
  const element = document.getElementById('my-element');

  // 1. Take snapshot
  const html = await snapshotElement(element);

  // 2. Generate PDF
  const pdfBlob = await generatePdf({
    source: { html },
    pdf: { format: 'A4' },
  });

  return pdfBlob;
}
```

## Local Development

### Prerequisites

- [pnpm](https://pnpm.io/)
- Node.js 24+

### Setup

```bash
pnpm install
```

### Build

```bash
pnpm build
```

## License

MIT
