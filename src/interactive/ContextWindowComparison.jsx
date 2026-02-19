import { useState } from 'react';
import { motion } from 'framer-motion';
import './ContextWindowComparison.css';

const MODELS = [
  {
    name: 'GPT-3.5',
    tokens: 4_096,
    year: 2022,
    color: 'var(--accent-blue)',
    glow: 'rgba(0, 212, 255, 0.35)',
  },
  {
    name: 'GPT-4',
    tokens: 8_192,
    year: 2023,
    color: 'var(--accent-purple)',
    glow: 'rgba(168, 85, 247, 0.35)',
  },
  {
    name: 'Claude 2',
    tokens: 100_000,
    year: 2023,
    color: 'var(--accent-orange)',
    glow: 'rgba(255, 136, 68, 0.35)',
  },
  {
    name: 'GPT-4 Turbo',
    tokens: 128_000,
    year: 2023,
    color: 'var(--accent-pink)',
    glow: 'rgba(255, 68, 170, 0.35)',
  },
  {
    name: 'Gemini 1.5 Pro',
    tokens: 2_000_000,
    year: 2024,
    color: 'var(--accent-green)',
    glow: 'rgba(34, 255, 136, 0.35)',
  },
];

const MAX_TOKENS = Math.max(...MODELS.map((m) => m.tokens));
const TOKENS_PER_PAGE = 750;

function formatNumber(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`;
  return n.toString();
}

function getBarWidth(tokens, isLog) {
  if (isLog) {
    const logMin = Math.log10(MODELS[0].tokens);
    const logMax = Math.log10(MAX_TOKENS);
    const logVal = Math.log10(tokens);
    // Map from [logMin, logMax] to [8%, 100%]
    return 8 + ((logVal - logMin) / (logMax - logMin)) * 92;
  }
  return Math.max(2, (tokens / MAX_TOKENS) * 100);
}

export default function ContextWindowComparison() {
  const [isLog, setIsLog] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="ctx-compare">
      <div className="ctx-compare__header">
        <h4 className="ctx-compare__title">Context Window Sizes</h4>
        <button
          className={`ctx-compare__toggle ${isLog ? 'ctx-compare__toggle--log' : ''}`}
          onClick={() => setIsLog((v) => !v)}
          aria-label={`Switch to ${isLog ? 'linear' : 'logarithmic'} scale`}
        >
          <span className={`ctx-compare__toggle-opt ${isLog ? 'ctx-compare__toggle-opt--active' : ''}`}>
            Log
          </span>
          <span className={`ctx-compare__toggle-opt ${!isLog ? 'ctx-compare__toggle-opt--active' : ''}`}>
            Linear
          </span>
        </button>
      </div>

      <div className="ctx-compare__chart">
        {MODELS.map((model, i) => {
          const width = getBarWidth(model.tokens, isLog);
          const isHovered = hoveredIndex === i;

          return (
            <div
              className="ctx-compare__row"
              key={model.name}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="ctx-compare__label">
                <span className="ctx-compare__model-name">{model.name}</span>
                <span className="ctx-compare__model-year">{model.year}</span>
              </div>
              <div className="ctx-compare__bar-track">
                <motion.div
                  className="ctx-compare__bar"
                  style={{
                    '--bar-color': model.color,
                    '--bar-glow': model.glow,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
                <motion.span
                  className="ctx-compare__bar-value"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                  style={{ color: model.color }}
                >
                  {formatNumber(model.tokens)}
                </motion.span>
              </div>

              {/* Tooltip */}
              {isHovered && (
                <motion.div
                  className="ctx-compare__tooltip"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ '--tip-color': model.color }}
                >
                  <div className="ctx-compare__tooltip-row">
                    <span className="ctx-compare__tooltip-label">Tokens</span>
                    <span className="ctx-compare__tooltip-value">
                      {model.tokens.toLocaleString()}
                    </span>
                  </div>
                  <div className="ctx-compare__tooltip-row">
                    <span className="ctx-compare__tooltip-label">Year</span>
                    <span className="ctx-compare__tooltip-value">{model.year}</span>
                  </div>
                  <div className="ctx-compare__tooltip-row">
                    <span className="ctx-compare__tooltip-label">~Pages</span>
                    <span className="ctx-compare__tooltip-value">
                      {Math.round(model.tokens / TOKENS_PER_PAGE).toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      <p className="ctx-compare__footnote">
        ~{TOKENS_PER_PAGE} tokens per page &middot; hover bars for details
      </p>
    </div>
  );
}
