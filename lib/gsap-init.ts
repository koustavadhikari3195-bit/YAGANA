import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─── Register GSAP plugins (run once) ─── */
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/* ═══════════════════════════════════════
   TEXT SPLITTER  (free SplitText alternative)
   ═══════════════════════════════════════ */

/**
 * Splits an element's text into individually-animated <span> wrappers.
 * Returns an array of span elements for GSAP targeting.
 */
export function splitTextIntoSpans(
    element: HTMLElement,
    mode: "chars" | "words" | "lines" = "words"
): HTMLSpanElement[] {
    const text = element.textContent || "";
    element.textContent = "";
    element.style.overflow = "hidden";

    const spans: HTMLSpanElement[] = [];

    if (mode === "chars") {
        for (const char of text) {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char;
            span.style.display = "inline-block";
            span.style.willChange = "transform, opacity";
            element.appendChild(span);
            spans.push(span);
        }
    } else if (mode === "words") {
        const words = text.split(/\s+/);
        words.forEach((word, i) => {
            const wrapper = document.createElement("span");
            wrapper.style.display = "inline-block";
            wrapper.style.overflow = "hidden";

            const inner = document.createElement("span");
            inner.textContent = word;
            inner.style.display = "inline-block";
            inner.style.willChange = "transform, opacity";
            wrapper.appendChild(inner);
            element.appendChild(wrapper);
            spans.push(inner);

            if (i < words.length - 1) {
                const space = document.createElement("span");
                space.innerHTML = "&nbsp;";
                space.style.display = "inline-block";
                element.appendChild(space);
            }
        });
    } else {
        /* lines mode — wrap each line in a span */
        element.textContent = text;
        const lineHeight = parseFloat(getComputedStyle(element).lineHeight) || 24;
        element.textContent = "";

        const words = text.split(/\s+/);
        let currentLine = "";
        const lines: string[] = [];

        /* Rough line break estimation */
        const tempSpan = document.createElement("span");
        tempSpan.style.visibility = "hidden";
        tempSpan.style.position = "absolute";
        tempSpan.style.whiteSpace = "nowrap";
        tempSpan.style.font = getComputedStyle(element).font;
        document.body.appendChild(tempSpan);

        const maxWidth = element.offsetWidth || 600;

        words.forEach((word) => {
            tempSpan.textContent = currentLine + (currentLine ? " " : "") + word;
            if (tempSpan.offsetWidth > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine += (currentLine ? " " : "") + word;
            }
        });
        if (currentLine) lines.push(currentLine);
        document.body.removeChild(tempSpan);

        lines.forEach((line) => {
            const wrapper = document.createElement("span");
            wrapper.style.display = "block";
            wrapper.style.overflow = "hidden";

            const inner = document.createElement("span");
            inner.textContent = line;
            inner.style.display = "block";
            inner.style.willChange = "transform, opacity";
            wrapper.appendChild(inner);
            element.appendChild(wrapper);
            spans.push(inner);
        });
    }

    return spans;
}
