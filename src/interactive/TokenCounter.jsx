import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTokenizer } from '../hooks/useTokenizer';
import './TokenCounter.css';

const TOKEN_COLORS = [
  'var(--accent-blue)',
  'var(--accent-purple)',
  'var(--accent-green)',
  'var(--accent-pink)',
  'var(--accent-orange)',
];

const TOKEN_GLOWS = [
  'rgba(0, 212, 255, 0.3)',
  'rgba(168, 85, 247, 0.3)',
  'rgba(34, 255, 136, 0.3)',
  'rgba(255, 68, 170, 0.3)',
  'rgba(255, 136, 68, 0.3)',
];

const DEFAULT_TEXT =
  'Large language models process text by breaking it into tokens. Each token is roughly 3-4 characters long.';

export default function TokenCounter() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const { tokens, count } = useTokenizer(text);

  return (
    <div className="token-counter">
      <div className="token-counter__input-section">
        <label className="token-counter__label" htmlFor="token-input">
          Type or paste text below
        </label>
        <textarea
          id="token-input"
          className="token-counter__textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing to see token breakdown..."
          spellCheck={false}
        />
        <div className="token-counter__stats">
          <motion.div
            className="token-counter__stat"
            key={count}
            initial={{ scale: 1.3, color: 'var(--accent-blue)' }}
            animate={{ scale: 1, color: 'var(--text-primary)' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <span className="token-counter__stat-value">{count}</span>
            <span className="token-counter__stat-label">tokens</span>
          </motion.div>
          <div className="token-counter__stat">
            <span className="token-counter__stat-value">{text.length}</span>
            <span className="token-counter__stat-label">characters</span>
          </div>
          <div className="token-counter__stat">
            <span className="token-counter__stat-value">
              {count > 0 ? (text.length / count).toFixed(1) : '—'}
            </span>
            <span className="token-counter__stat-label">chars/token</span>
          </div>
        </div>
      </div>

      <div className="token-counter__viz-section">
        <div className="token-counter__viz-header">
          <h4 className="token-counter__viz-title">Token Breakdown</h4>
          <span className="token-counter__viz-hint">
            Each chip = 1 token
          </span>
        </div>
        <div className="token-counter__chips">
          <AnimatePresence mode="popLayout">
            {tokens.map((token, i) => {
              const colorIndex = i % TOKEN_COLORS.length;
              return (
                <motion.span
                  key={`${i}-${token}`}
                  className="token-counter__chip"
                  style={{
                    '--chip-color': TOKEN_COLORS[colorIndex],
                    '--chip-glow': TOKEN_GLOWS[colorIndex],
                  }}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -10 }}
                  transition={{
                    duration: 0.2,
                    delay: Math.min(i * 0.015, 0.8),
                    ease: 'easeOut',
                  }}
                  layout
                >
                  {token}
                </motion.span>
              );
            })}
          </AnimatePresence>
          {tokens.length === 0 && (
            <span className="token-counter__empty">
              Tokens will appear here...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
