import { Highlight, themes } from 'prism-react-renderer';
import './CodeBlock.css';

const neonTheme = {
  ...themes.nightOwl,
  plain: {
    ...themes.nightOwl.plain,
    backgroundColor: 'transparent',
  },
  styles: [
    ...themes.nightOwl.styles,
    { types: ['keyword'], style: { color: '#a855f7' } },
    { types: ['string', 'template-string'], style: { color: '#22ff88' } },
    { types: ['function'], style: { color: '#00d4ff' } },
    { types: ['comment'], style: { color: '#666688', fontStyle: 'italic' } },
    { types: ['number', 'boolean'], style: { color: '#ff8844' } },
    { types: ['operator', 'punctuation'], style: { color: '#9999bb' } },
    { types: ['class-name', 'builtin'], style: { color: '#ff44aa' } },
    { types: ['parameter'], style: { color: '#e8e8f0' } },
  ],
};

export default function CodeBlock({ code, language = 'python', filename }) {
  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-block-dot" />
        <span className="code-block-dot" />
        <span className="code-block-dot" />
        {filename && <span className="code-block-filename">{filename}</span>}
      </div>
      <Highlight theme={neonTheme} code={code.trim()} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
