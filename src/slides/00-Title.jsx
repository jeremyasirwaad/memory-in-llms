import { motion } from 'framer-motion';

export default function Title() {
  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1 }}
      >
        🧠
      </motion.div>
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          background: 'linear-gradient(135deg, #00d4ff, #a855f7, #ff44aa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
        }}
      >
        Memory in LLMs
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', color: 'var(--text-secondary)', maxWidth: '600px' }}
      >
        How large language models remember — and forget — across conversations
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '2rem' }}
      >
        Use arrow keys to navigate →
      </motion.div>
    </div>
  );
}
