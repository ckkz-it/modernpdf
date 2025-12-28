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
  outline?: boolean;
  tagged?: boolean;
  /**
   * Emulates media type before PDF generation.
   * @default 'print'
   */
  mediaType?: 'screen' | 'print';
}

/**
 * Options for waiting before PDF generation.
 */
export interface WaitOptions {
  /**
   * When to consider navigation/loading finished.
   * @default 'networkidle'
   */
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
  /**
   * Maximum time to wait in milliseconds.
   * @default 30000
   */
  timeout?: number;
  /**
   * Additional delay in milliseconds to wait after the navigation/loading condition is met.
   * Useful for ensuring animations are finished.
   */
  delay?: number;
}

/**
 * ModernPDF internal processing options.
 */
export interface ProcessingOptions {
  /**
   * Whether to optimize the PDF using Ghostscript.
   * @default false
   */
  optimize?: boolean;
}

/**
 * Enforces providing either 'html' or 'url', but not both.
 */
export type PdfSource = { html: string; url?: never } | { url: string; html?: never };

/**
 * Request structure for the ModernPDF API.
 */
export interface GeneratePdfRequest {
  /**
   * Source for PDF generation.
   */
  source: PdfSource;
  /**
   * PDF formatting options.
   */
  pdf?: PdfOptions;
  /**
   * Waiting options before generation.
   */
  wait?: WaitOptions;
  /**
   * Internal processing options.
   */
  options?: ProcessingOptions;
}

/**
 * Options for the ModernPDF API client.
 */
export interface ApiOptions {
  /**
   * API key for authentication.
   */
  apiKey: string;
  /**
   * Custom API URL for PDF generation.
   */
  apiUrl?: string;
}
