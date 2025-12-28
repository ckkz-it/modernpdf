import type { GeneratePdfRequest, ApiOptions } from './types';

/**
 * Sends a POST request to the ModernPDF API to generate a PDF from the provided HTML or URL.
 */
export async function generatePdf(request: GeneratePdfRequest, options: ApiOptions): Promise<Blob> {
  const { apiUrl = 'https://modernpdf.p.rapidapi.com/api/pdf', apiKey } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  let url: URL;
  try {
    url = new URL(apiUrl);
  } catch (error) {
    throw new Error(`Invalid API URL: ${apiUrl}`);
  }

  if (url.hostname.endsWith('rapidapi.com')) {
    headers['X-RapidAPI-Key'] = apiKey;
    headers['X-RapidAPI-Host'] = url.hostname;
  } else {
    headers['X-API-Key'] = apiKey;
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`PDF generation failed: ${response.statusText}`);
  }

  return await response.blob();
}
