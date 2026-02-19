import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const columns = [
  {
    icon: '⚡',
    title: 'Working Memory',
    subtitle: 'Context Window',
    color: 'var(--accent-blue)',
    items: ['Current prompt + response', 'Active conversation turn', 'System instructions'],
  },
  {
    icon: '🧠',
    title: 'Short-Term Memory',
    subtitle: 'Conversation Buffer',
    color: 'var(--accent-purple)',
    items: ['Recent conversation history', 'Summarized past turns', 'Session-level state'],
  },
  {
    icon: '💾',
    title: 'Long-Term Memory',
    subtitle: 'External Storage',
    color: 'var(--accent-green)',
    items: ['Vector databases', 'User profiles & preferences', 'Knowledge bases'],
  },
];

export default function MemoryHierarchies() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        Memory <span className="neon-text-blue">Hierarchies</span>
      </motion.h2>
      <motion.p variants={fadeUp}>
        Just like humans, we can give LLMs different "tiers" of memory — each with different capacity and access patterns.
      </motion.p>
      <motion.div
        variants={fadeUp}
        style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
      >
        {columns.map((col) => (
          <div
            key={col.title}
            style={{
              flex: '1 1 250px',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              padding: '1.5rem',
              borderTop: `3px solid ${col.color}`,
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{col.icon}</div>
            <h3 style={{ color: col.color, marginBottom: '0.25rem' }}>{col.title}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{col.subtitle}</p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {col.items.map((item) => (
                <li key={item} style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', paddingLeft: '1rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: col.color }}>›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
