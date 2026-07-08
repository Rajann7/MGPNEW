/**
 * Renders safe JSON-LD (e.g. BreadcrumbList) per Next.js's documented pattern
 * (https://nextjs.org/docs/app/guides/json-ld). Never pass phone/email/private
 * data into `data` — this is public HTML.
 */
export function SeoJsonLd({ data, id }: { data: object; id: string }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
