import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const examples = [
  { text: '"Hello"', tokens: ['Hello'], count: 1 },
  { text: '"chatbot"', tokens: ['chat', 'bot'], count: 2 },
  { text: '"unbelievable"', tokens: ['un', 'believ', 'able'], count: 3 },
  { text: '"I love LLMs!"', tokens: ['I', ' love', ' LL', 'Ms', '!'], count: 5 },
];

export default function WhatIsAToken() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <motion.h2 variants={fadeUp}>
        What Is a <span className="neon-text-green">Token</span>?
      </motion.h2>
      <motion.p variants={fadeUp}>
        A <strong>token</strong> is the smallest unit of text an LLM reads. It's not a word, not a character — it's a <strong>chunk</strong> produced by the model's tokenizer. Roughly <strong>1 token ≈ ¾ of a word</strong>.
      </motion.p>

      <motion.div
        variants={fadeUp}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
        }}
      >
        {examples.map((ex) => (
          <div
            key={ex.text}
            style={{
              background: 'rgba(0,255,136,0.05)',
              border: '1px solid rgba(0,255,136,0.2)',
              borderRadius: '12px',
              padding: '1rem',
            }}
          >
            <div style={{ fontFamily: 'monospace', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              {ex.text}
            </div>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
              {ex.tokens.map((t, i) => (
                <span
                  key={i}
                  style={{
                    background: 'rgba(0,255,136,0.15)',
                    border: '1px solid rgba(0,255,136,0.4)',
                    borderRadius: '6px',
                    padding: '0.15rem 0.5rem',
                    fontFamily: 'monospace',
                    fontSize: '0.95rem',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>
              {ex.count} token{ex.count > 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.p variants={fadeUp} style={{ fontSize: '0.95rem', opacity: 0.7 }}>
        Every prompt, every reply, every piece of context costs tokens. That's why token count = memory capacity.
      </motion.p>
    </motion.div>
  );
}
