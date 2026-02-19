import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const messages = [
  { role: 'user', text: 'Hey, can you help me plan a trip to Japan?' },
  { role: 'ai', text: 'Of course! When are you planning to travel and what interests you most?' },
  { role: 'user', text: 'Next April. I love food and temples.' },
  { role: 'ai', text: 'April is perfect for cherry blossoms! I\'d recommend Kyoto for temples and Osaka for street food.' },
  { role: 'user', text: 'What about Tokyo?' },
  { role: 'ai', text: 'Tokyo is great for Shibuya, Akihabara, and Tsukiji outer market. I\'d suggest 3–4 days there.' },
];

const trimmedCount = 2;
const maxTokens = 200;
const currentTokens = 185;

export default function BufferDemo() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        Demo: <span className="neon-text-blue">Buffer Memory</span> in Action
      </motion.h2>

      <motion.div
        variants={fadeUp}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 280px',
          gap: '1.2rem',
          alignItems: 'start',
        }}
      >
        {/* Chat window */}
        <div
          style={{
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid rgba(0,212,255,0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Title bar */}
          <div
            style={{
              padding: '0.6rem 1rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22ff88' }} />
            chat_session — buffer_memory.py
          </div>

          {/* Messages */}
          <div style={{ padding: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {messages.map((msg, i) => {
              const isTrimmed = i < trimmedCount;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    opacity: isTrimmed ? 0.3 : 1,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '75%',
                      padding: '0.5rem 0.8rem',
                      borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                      background: msg.role === 'user'
                        ? 'rgba(0,212,255,0.1)'
                        : 'rgba(168,85,247,0.1)',
                      border: `1px solid ${msg.role === 'user' ? 'rgba(0,212,255,0.2)' : 'rgba(168,85,247,0.2)'}`,
                      fontSize: '0.78rem',
                      color: 'var(--text-primary)',
                      textDecoration: isTrimmed ? 'line-through' : 'none',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <span style={{ fontSize: '0.65rem', color: isTrimmed ? '#ff4444' : 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                      {msg.role === 'user' ? 'User' : 'AI'} {isTrimmed && '— TRIMMED'}
                    </span>
                    {msg.text}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Status panel */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
          }}
        >
          {/* Token meter */}
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: '12px',
              padding: '0.8rem',
              border: '1px solid rgba(0,212,255,0.15)',
            }}
          >
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
              TOKEN USAGE
            </div>
            <div
              style={{
                height: '8px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '0.4rem',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentTokens / maxTokens) * 100}%` }}
                transition={{ delay: 0.5, duration: 1 }}
                style={{
                  height: '100%',
                  background: currentTokens / maxTokens > 0.8
                    ? 'linear-gradient(90deg, #ff8844, #ff4444)'
                    : 'linear-gradient(90deg, #00d4ff, #a855f7)',
                  borderRadius: '4px',
                }}
              />
            </div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)' }}>
              {currentTokens} / {maxTokens} tokens
            </div>
          </div>

          {/* Buffer status */}
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: '12px',
              padding: '0.8rem',
              border: '1px solid rgba(0,212,255,0.15)',
            }}
          >
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
              BUFFER STATE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>total msgs: </span>
                <span style={{ color: 'var(--accent-blue)' }}>6</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>kept: </span>
                <span style={{ color: 'var(--accent-green)' }}>4</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>trimmed: </span>
                <span style={{ color: '#ff4444' }}>2</span>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: '12px',
              padding: '0.8rem',
              border: '1px solid rgba(0,212,255,0.15)',
            }}
          >
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>
              STRATEGY
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Oldest messages are <span style={{ color: '#ff4444' }}>dropped</span> when the buffer exceeds the token limit. Simple but lossy.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
