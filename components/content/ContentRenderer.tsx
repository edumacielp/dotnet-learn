'use client';
import type { ContentBlock, I18nContent } from '@/types';
import CodeBlock from './CodeBlock';
import ConceptCard from './ConceptCard';
import Callout from './Callout';
import PortMapper from '@/components/interactive/PortMapper';
import ImageContainerViz from '@/components/interactive/ImageContainerViz';

interface Props {
  blocks: ContentBlock[];
  t: I18nContent;
}

export default function ContentRenderer({ blocks, t }: Props) {
  return (
    <div className="prose-content">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'text':
            return <p key={i}>{block.text}</p>;

          case 'heading':
            return block.level === 2
              ? <h2 key={i}>{block.text}</h2>
              : <h3 key={i}>{block.text}</h3>;

          case 'list':
            return (
              <ul key={i}>
                {block.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );

          case 'code':
            return <CodeBlock key={i} code={block.code} language={block.language} label={block.label} />;

          case 'callout':
            return <Callout key={i} variant={block.variant} text={block.text} />;

          case 'concept-grid':
            return (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '0.75rem',
                margin: '1.25rem 0',
              }}>
                {block.items.map((item, j) => (
                  <ConceptCard key={j} {...item} />
                ))}
              </div>
            );

          case 'interactive':
            if (block.component === 'port-mapper') {
              return <PortMapper key={i} t={t.interactive.portMapper} />;
            }
            if (block.component === 'image-container-viz') {
              return <ImageContainerViz key={i} t={t.interactive.imageContainer} />;
            }
            return null;

          default:
            return null;
        }
      })}
    </div>
  );
}
