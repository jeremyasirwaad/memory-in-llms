import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DigitalAmnesia() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        The Problem: <span className="neon-text-pink">Digital Amnesia</span>
      </motion.h2>
      <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.3rem)' }}>
          Imagine having a conversation with someone who <strong>forgets everything</strong> you said the moment you stop talking.
        </p>
        <p>
          That's what it's like talking to a "vanilla" LLM. Every API call starts with a <strong>blank slate</strong>.
        </p>
      </motion.div>
      <motion.div
        variants={fadeUp}
        style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '1.5rem 2rem',
          borderLeft: '4px solid var(--accent-pink)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>
          <span style={{ color: 'var(--accent-blue)' }}>User:</span> My name is Alice.
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>
          <span style={{ color: 'var(--accent-green)' }}>AI:</span> Nice to meet you, Alice!
        </div>
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.85rem' }}>— new API call —</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>
          <span style={{ color: 'var(--accent-blue)' }}>User:</span> What's my name?
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>
          <span style={{ color: 'var(--accent-green)' }}>AI:</span> I don't have access to that information. 🤷
        </div>
      </motion.div>
    </motion.div>
  );
}
