/**
 * Snapshots the current DOM state of an element, inlining CSS, converting Canvas to images,
 * and ensuring input values are preserved in the HTML.
 */
export async function snapshotElement(rootElement: HTMLElement = document.documentElement): Promise<string> {
  // 1. Clone the DOM to avoid modifying the live page
  const clone = rootElement.cloneNode(true) as HTMLElement;

  // --- PROBLEM 1: INPUTS & TEXTAREAS ---
  const realInputs = rootElement.querySelectorAll('input, textarea, select');
  const cloneInputs = clone.querySelectorAll('input, textarea, select');

  realInputs.forEach((input, i) => {
    const typedInput = input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const cloneTypedInput = cloneInputs[i] as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

    if (typedInput instanceof HTMLInputElement && (typedInput.type === 'checkbox' || typedInput.type === 'radio')) {
      if (typedInput.checked) cloneTypedInput.setAttribute('checked', '');
    } else {
      cloneTypedInput.setAttribute('value', typedInput.value);
    }
  });

  // --- PROBLEM 2: CANVAS ---
  const realCanvases = rootElement.querySelectorAll('canvas');
  const cloneCanvases = clone.querySelectorAll('canvas');

  realCanvases.forEach((canvas, i) => {
    try {
      const dataUrl = canvas.toDataURL();
      const img = document.createElement('img');
      img.src = dataUrl;
      const originalCanvas = realCanvases[i];
      img.style.cssText = originalCanvas.style.cssText;
      if (!img.style.width) img.style.width = originalCanvas.width + 'px';
      if (!img.style.height) img.style.height = originalCanvas.height + 'px';
      img.className = originalCanvas.className;

      const parent = cloneCanvases[i].parentNode;
      if (parent) {
        parent.replaceChild(img, cloneCanvases[i]);
      }
    } catch (e) {
      console.warn('Could not snapshot canvas (likely tainted):', e);
    }
  });

  // --- PROBLEM 3: INLINING CSS ---
  const styles: string[] = [];
  const styleSheets = Array.from(document.styleSheets);

  for (const sheet of styleSheets) {
    try {
      const rules = Array.from(sheet.cssRules)
        .map((rule) => rule.cssText)
        .join('\n');
      styles.push(rules);
    } catch (e) {
      console.warn('Cannot read external CSS, trying to fetch content...', (sheet as CSSStyleSheet).href);
      if ((sheet as CSSStyleSheet).href) {
        try {
          const res = await fetch((sheet as CSSStyleSheet).href!);
          const text = await res.text();
          styles.push(text);
        } catch (fetchErr) {
          console.error('Failed to fetch external CSS:', fetchErr);
        }
      }
    }
  }

  const links = clone.querySelectorAll('link[rel="stylesheet"]');
  links.forEach((link) => link.remove());

  const styleTag = document.createElement('style');
  styleTag.textContent = styles.join('\n');
  const head = clone.querySelector('head');
  if (head) {
    head.appendChild(styleTag);
  } else {
    clone.prepend(styleTag);
  }

  // --- FINAL: Remove scripts ---
  clone.querySelectorAll('script').forEach((s) => s.remove());

  return clone.outerHTML;
}
