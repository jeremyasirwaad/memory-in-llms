import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const steps = [
  { num: '1', title: 'Buffering & Trimming', desc: 'Store everything, trim when full', color: 'var(--accent-blue)', icon: '📋' },
  { num: '2', title: 'Sliding Window', desc: 'Keep the N most recent messages', color: 'var(--accent-purple)', icon: '🪟' },
  { num: '3', title: 'Summarization', desc: 'Compress old context into summaries', color: 'var(--accent-green)', icon: '📝' },
];

export default function MemoryLadderIntro() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        The Memory <span className="neon-text-purple">Ladder</span>
      </motion.h2>
      <motion.p variants={fadeUp}>
        Three progressively smarter strategies for managing conversation history:
      </motion.p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {steps.map((step) => (
          <motion.div
            key={step.num}
            variants={fadeUp}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              background: 'var(--bg-card)',
              borderRadius: '12px',
              padding: '1.5rem 2rem',
              borderLeft: `4px solid ${step.color}`,
            }}
          >
            <div style={{
              fontSize: '2rem',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: 'var(--bg-surface)',
              flexShrink: 0,
            }}>
              {step.icon}
            </div>
            <div>
              <h3 style={{ color: step.color }}>
                <span style={{ opacity: 0.5, marginRight: '0.5rem' }}>Step {step.num}:</span>
                {step.title}
              </h3>
              <p style={{ fontSize: '1rem', marginTop: '0.25rem' }}>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
