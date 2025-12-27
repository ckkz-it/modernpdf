/**
 * Playwright-compatible PDF formatting options.
 */
export type PaperFormat = 'Letter' | 'Legal' | 'Tabloid' | 'Ledger' | 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6';

export interface PDFMargin {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
}

export interface PdfOptions {
  scale?: number;
  displayHeaderFooter?: boolean;
  headerTemplate?: string;
  footerTemplate?: string;
  printBackground?: boolean;
  landscape?: boolean;
  pageRanges?: string;
  format?: PaperFormat;
  width?: string | number;
  height?: string | number;
  margin?: PDFMargin;
  preferCSSPageSize?: boolean;
  omitBackground?: boolean;
  outline?: boolean;
  tagged?: boolean;
}

/**
 * Options for waiting before PDF generation.
 */
export interface WaitOptions {
  for?: 'navigation' | 'load' | 'networkidle' | 'domcontentloaded';
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
  timeout?: number;
}

/**
 * Request structure for the ModernPDF API.
 * Requires at least 'html' or 'url' in the source.
 */
export interface GeneratePdfRequest {
  source: { html: string; url?: string } | { url: string; html?: string };
  pdf?: PdfOptions;
  wait?: WaitOptions;
}
