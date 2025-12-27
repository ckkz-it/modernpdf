import { useCallback, useState } from 'react';
import { snapshotElement, generatePdf, type PdfOptions, type WaitOptions } from '@modernpdf/core';

export interface UseSnapshotReturn {
  takeSnapshot: (options?: { rootElement?: HTMLElement; pdf?: PdfOptions; wait?: WaitOptions }) => Promise<Blob>;
  isLoading: boolean;
  error: Error | null;
}

/**
 * A React hook that provides a function to take a DOM snapshot and generate a PDF.
 * Manages loading and error states for the asynchronous PDF generation process.
 */
export function useSnapshot(): UseSnapshotReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const takeSnapshot = useCallback(
    async (
      options: {
        rootElement?: HTMLElement;
        pdf?: PdfOptions;
        wait?: WaitOptions;
      } = {}
    ) => {
      const { rootElement, pdf, wait } = options;
      setIsLoading(true);
      setError(null);
      try {
        // 1. Capture the DOM snapshot
        const html = await snapshotElement(rootElement);

        // 2. Generate PDF via API
        const pdfBlob = await generatePdf({
          source: { html },
          pdf,
          wait
        });

        return pdfBlob;
      } catch (e) {
        const err = e instanceof Error ? e : new Error('Failed to generate PDF');
        setError(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { takeSnapshot, isLoading, error };
}
