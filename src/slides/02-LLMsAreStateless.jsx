import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function LLMsAreStateless() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        LLMs Are <span className="neon-text-blue">Stateless</span> by Default
      </motion.h2>
      <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)' }}>
        An LLM is a <strong>function</strong>: it takes tokens in, produces tokens out. It has no built-in memory between calls.
      </motion.p>
      <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {[
          { icon: '📥', title: 'Input', desc: 'Full prompt + conversation sent each time', color: 'var(--accent-blue)' },
          { icon: '⚙️', title: 'Process', desc: 'Attention over all input tokens', color: 'var(--accent-purple)' },
          { icon: '📤', title: 'Output', desc: 'Response generated, then state discarded', color: 'var(--accent-green)' },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              flex: '1 1 200px',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              padding: '1.5rem',
              borderTop: `3px solid ${item.color}`,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
            <h3 style={{ color: item.color, marginBottom: '0.5rem' }}>{item.title}</h3>
            <p style={{ fontSize: '0.95rem' }}>{item.desc}</p>
          </div>
        ))}
      </motion.div>
      <motion.p variants={fadeUp} style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
        "Memory" is an illusion created by the <strong>application layer</strong> — not the model itself.
      </motion.p>
    </motion.div>
  );
}
