import type { GeneratePdfRequest } from './types';

/**
 * Sends a POST request to the ModernPDF API to generate a PDF from the provided HTML or URL.
 */
export async function generatePdf(
  request: GeneratePdfRequest,
  apiUrl: string = 'https://modernpdf.dev/api/pdf/'
): Promise<Blob> {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error(`PDF generation failed: ${response.statusText}`);
  }

  return await response.blob();
}
