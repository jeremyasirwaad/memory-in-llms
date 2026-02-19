import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const takeaways = [
  { icon: '🔄', text: 'LLMs are stateless — memory is built by the application layer', color: 'var(--accent-blue)' },
  { icon: '📏', text: 'Context windows are finite and measured in tokens', color: 'var(--accent-purple)' },
  { icon: '📉', text: 'Bigger context ≠ better recall (lost in the middle)', color: 'var(--accent-pink)' },
  { icon: '📋', text: 'Buffer → Sliding Window → Summary: the memory ladder', color: 'var(--accent-green)' },
  { icon: '🔗', text: 'Hybrid systems combine strategies for production use', color: 'var(--accent-orange)' },
  { icon: '🎯', text: 'Choose your strategy based on conversation length, cost, and needs', color: 'var(--accent-yellow)' },
];

export default function Recap() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        Key <span className="neon-text-blue">Takeaways</span>
      </motion.h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {takeaways.map((item) => (
          <motion.div
            key={item.text}
            variants={fadeUp}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'var(--bg-card)',
              borderRadius: '10px',
              padding: '1rem 1.5rem',
              borderLeft: `3px solid ${item.color}`,
            }}
          >
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</span>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{item.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
