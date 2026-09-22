import React from 'react';

interface HtmlViewProps {
  content: string;
  className?: string;
  fontSize?: number;
}

export const HtmlView: React.FC<HtmlViewProps> = ({ content, className = '', fontSize = 16 }) => {
  if (!content) return null;

  // Clean unicode escaped HTML entities if present e.g. \u003Cp\u003E
  let sanitizedHtml = content
    .replace(/\\u003C/g, '<')
    .replace(/\\u003E/g, '>')
    .replace(/\\u0026/g, '&')
    .replace(/\\n/g, '<br/>');

  // If content does not have HTML tags, wrap newlines into paragraphs
  const hasHtml = /<[a-z][\s\S]*>/i.test(sanitizedHtml);
  if (!hasHtml) {
    sanitizedHtml = sanitizedHtml
      .split('\n\n')
      .map(p => `<p class="mb-4 leading-relaxed">${p.replace(/\n/g, '<br/>')}</p>`)
      .join('');
  }

  return (
    <div
      style={{ fontSize: `${fontSize}px` }}
      className={`prose max-w-none font-serif text-ieca-black leading-relaxed space-y-4 [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:border-l-3 [&>p]:border-ieca-coral/40 [&>p]:pl-4 [&>p]:py-0.5 ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};
