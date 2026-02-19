import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const oldMessages = [
  { role: 'user', text: 'I want to plan a trip to Japan next April.' },
  { role: 'ai', text: 'April is cherry blossom season! Great choice.' },
  { role: 'user', text: 'I love food and temples. Budget is $3000.' },
  { role: 'ai', text: 'I\'d suggest Kyoto for temples and Osaka for street food. $3k is doable for 10 days.' },
];

const summary = 'User is planning a 10-day Japan trip in April. Interests: food, temples, cherry blossoms. Budget: $3,000. Discussed Kyoto (temples) and Osaka (street food) as key destinations.';

const recentMessages = [
  { role: 'user', text: 'Should I get a JR Pass?' },
  { role: 'ai', text: 'Yes! A 14-day JR Pass ($415) covers bullet trains between all the cities we discussed. It\'ll save you a lot on transport.' },
];

export default function SummarizationDemo() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
    >
      <motion.h2 variants={fadeUp}>
        Demo: <span className="neon-text-green">Summarization</span> in Action
      </motion.h2>

      <motion.div
        variants={fadeUp}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.2rem',
          alignItems: 'start',
        }}
      >
        {/* BEFORE: Original messages */}
        <div
          style={{
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '0.6rem 1rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff8844' }} />
            BEFORE — 6 messages (380 tokens)
          </div>
          <div style={{ padding: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {[...oldMessages, ...recentMessages].map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '0.4rem 0.7rem',
                    borderRadius: msg.role === 'user' ? '10px 10px 4px 10px' : '10px 10px 10px 4px',
                    background: msg.role === 'user' ? 'rgba(0,212,255,0.1)' : 'rgba(168,85,247,0.1)',
                    border: `1px solid ${msg.role === 'user' ? 'rgba(0,212,255,0.2)' : 'rgba(168,85,247,0.2)'}`,
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AFTER: Summary + recent */}
        <div
          style={{
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid rgba(34,255,136,0.15)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '0.6rem 1rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22ff88' }} />
            AFTER — summary + 2 messages (190 tokens)
          </div>
          <div style={{ padding: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {/* Summary block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{
                padding: '0.6rem 0.8rem',
                borderRadius: '10px',
                background: 'rgba(34,255,136,0.06)',
                border: '1px solid rgba(34,255,136,0.25)',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)',
              }}
            >
              <div style={{ fontSize: '0.6rem', color: 'var(--accent-green)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Compressed Summary
              </div>
              {summary}
            </motion.div>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>RECENT</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
            </div>

            {/* Recent messages */}
            {recentMessages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '0.4rem 0.7rem',
                    borderRadius: msg.role === 'user' ? '10px 10px 4px 10px' : '10px 10px 10px 4px',
                    background: msg.role === 'user' ? 'rgba(0,212,255,0.1)' : 'rgba(168,85,247,0.1)',
                    border: `1px solid ${msg.role === 'user' ? 'rgba(0,212,255,0.2)' : 'rgba(168,85,247,0.2)'}`,
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Token savings bar */}
      <motion.div
        variants={fadeUp}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: 'var(--bg-card)',
          borderRadius: '10px',
          padding: '0.6rem 1rem',
          border: '1px solid rgba(34,255,136,0.15)',
        }}
      >
        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>TOKEN SAVINGS</span>
        <div style={{ flex: 1, display: 'flex', gap: '4px', alignItems: 'center' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '50%' }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #22ff88, #00d4ff)', borderRadius: '3px' }}
            />
          </div>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)' }}>50% reduction</span>
      </motion.div>
    </motion.div>
  );
}
