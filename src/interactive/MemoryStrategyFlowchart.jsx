import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MemoryStrategyFlowchart.css';

/* ── Decision tree data ── */
const TREE = {
  q1: {
    type: 'question',
    text: 'How long are your conversations?',
    options: [
      { label: 'Short (< 10 turns)', next: 'result_buffer' },
      { label: 'Long (10+ turns)', next: 'q2' },
    ],
  },
  q2: {
    type: 'question',
    text: 'Do you need cross-session memory?',
    options: [
      { label: 'No', next: 'q3a' },
      { label: 'Yes', next: 'q3b' },
    ],
  },
  q3a: {
    type: 'question',
    text: 'How much detail do you need?',
    options: [
      { label: 'Key points only', next: 'result_summary' },
      { label: 'Full context', next: 'result_sliding' },
    ],
  },
  q3b: {
    type: 'question',
    text: 'Budget constraints?',
    options: [
      { label: 'Cost-sensitive', next: 'result_vector' },
      { label: 'No budget limit', next: 'result_hybrid' },
    ],
  },
  result_buffer: {
    type: 'result',
    title: 'Buffer Memory',
    description:
      'Keep the entire conversation in memory. Simple and lossless for short interactions.',
    color: 'var(--accent-blue)',
    glow: 'rgba(0, 212, 255, 0.3)',
    icon: '\uD83D\uDCE6',
  },
  result_summary: {
    type: 'result',
    title: 'Summary Memory',
    description:
      'Periodically compress older messages into summaries. Retains key points while reducing token usage.',
    color: 'var(--accent-purple)',
    glow: 'rgba(168, 85, 247, 0.3)',
    icon: '\uD83D\uDCDD',
  },
  result_sliding: {
    type: 'result',
    title: 'Sliding Window',
    description:
      'Keep only the most recent N messages. Predictable memory usage with fixed context length.',
    color: 'var(--accent-green)',
    glow: 'rgba(34, 255, 136, 0.3)',
    icon: '\uD83D\uDD73',
  },
  result_vector: {
    type: 'result',
    title: 'Vector Store',
    description:
      'Embed past conversations and retrieve relevant memories via similarity search. Scales across sessions.',
    color: 'var(--accent-orange)',
    glow: 'rgba(255, 136, 68, 0.3)',
    icon: '\uD83E\uDDF2',
  },
  result_hybrid: {
    type: 'result',
    title: 'Hybrid System',
    description:
      'Combine sliding window for recency, summaries for compression, and vector search for long-term recall.',
    color: 'var(--accent-pink)',
    glow: 'rgba(255, 68, 170, 0.3)',
    icon: '\u2699\uFE0F',
  },
};

const QUESTION_LABELS = {
  q1: 'Conversation length',
  q2: 'Cross-session?',
  q3a: 'Detail level',
  q3b: 'Budget',
};

/* ── Component ── */
export default function MemoryStrategyFlowchart() {
  const [currentNode, setCurrentNode] = useState('q1');
  const [path, setPath] = useState([]); // Array of { nodeId, choiceLabel }

  const node = TREE[currentNode];

  const handleChoice = useCallback(
    (option) => {
      setPath((prev) => [
        ...prev,
        { nodeId: currentNode, choiceLabel: option.label },
      ]);
      setCurrentNode(option.next);
    },
    [currentNode],
  );

  const handleReset = useCallback(() => {
    setCurrentNode('q1');
    setPath([]);
  }, []);

  const handleBreadcrumbClick = useCallback(
    (index) => {
      // Go back to the question at this breadcrumb index
      const targetNodeId = path[index].nodeId;
      setPath((prev) => prev.slice(0, index));
      setCurrentNode(targetNodeId);
    },
    [path],
  );

  const isResult = node.type === 'result';

  return (
    <div className="flowchart">
      {/* Breadcrumb trail */}
      {path.length > 0 && (
        <div className="flowchart__breadcrumbs">
          {path.map((crumb, i) => (
            <span key={i} className="flowchart__crumb-group">
              <button
                className="flowchart__crumb"
                onClick={() => handleBreadcrumbClick(i)}
                title={`Go back to: ${QUESTION_LABELS[crumb.nodeId] || crumb.nodeId}`}
              >
                {QUESTION_LABELS[crumb.nodeId] || crumb.nodeId}
              </button>
              <span className="flowchart__crumb-arrow">&rarr;</span>
              <span className="flowchart__crumb-choice">{crumb.choiceLabel}</span>
              {i < path.length - 1 && (
                <span className="flowchart__crumb-sep">&middot;</span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Animated content area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNode}
          className="flowchart__card-wrapper"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {!isResult ? (
            /* ── Question Card ── */
            <div className="flowchart__question-card">
              <div className="flowchart__question-number">
                Question {path.length + 1}
              </div>
              <h3 className="flowchart__question-text">{node.text}</h3>
              <div className="flowchart__options">
                {node.options.map((option, i) => (
                  <motion.button
                    key={option.label}
                    className="flowchart__option-btn"
                    onClick={() => handleChoice(option)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            /* ── Result Card ── */
            <div
              className="flowchart__result-card"
              style={{
                '--result-color': node.color,
                '--result-glow': node.glow,
              }}
            >
              <div className="flowchart__result-badge">
                <span className="flowchart__result-icon">{node.icon}</span>
              </div>
              <h3 className="flowchart__result-title">{node.title}</h3>
              <p className="flowchart__result-desc">{node.description}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Start Over */}
      {path.length > 0 && (
        <motion.button
          className="flowchart__reset-btn"
          onClick={handleReset}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Over
        </motion.button>
      )}
    </div>
  );
}
