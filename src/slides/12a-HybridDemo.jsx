import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const vectorResults = [
  { score: 0.94, text: 'User prefers window seats on flights', source: 'conv #12, 3 weeks ago' },
  { score: 0.87, text: 'User is vegetarian, allergic to nuts', source: 'conv #8, 1 month ago' },
  { score: 0.81, text: 'User\'s budget for trips is usually ~$3,000', source: 'conv #15, 2 weeks ago' },
];

const summaryBlock = 'Planning Japan trip in April. Discussed Kyoto, Osaka, Tokyo. Interested in temples, food, cherry blossoms.';

const recentMsgs = [
  { role: 'user', text: 'Can you book me a flight to Tokyo?' },
];

export default function HybridDemo() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <motion.h2 variants={fadeUp}>
        Demo: <span className="neon-text-orange">Hybrid Memory</span> in Action
      </motion.h2>

      {/* Main layout: 3-column memory sources feeding into context */}
      <motion.div
        variants={fadeUp}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0.8rem',
          alignItems: 'start',
        }}
      >
        {/* Vector Store */}
        <div
          style={{
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid rgba(168,85,247,0.2)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            padding: '0.5rem 0.8rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-purple)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}>
            <span style={{ fontSize: '0.85rem' }}>&#x1F50D;</span> VECTOR STORE
          </div>
          <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {vectorResults.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                style={{
                  padding: '0.4rem 0.6rem',
                  borderRadius: '8px',
                  background: 'rgba(168,85,247,0.06)',
                  border: '1px solid rgba(168,85,247,0.12)',
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span style={{ color: 'var(--accent-purple)' }}>similarity: {r.score}</span>
                </div>
                <div style={{ color: 'var(--text-primary)', marginBottom: '0.15rem' }}>{r.text}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem' }}>{r.source}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Memory */}
        <div
          style={{
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid rgba(34,255,136,0.2)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            padding: '0.5rem 0.8rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-green)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}>
            <span style={{ fontSize: '0.85rem' }}>&#x1F4DD;</span> SESSION SUMMARY
          </div>
          <div style={{ padding: '0.6rem' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                padding: '0.5rem 0.6rem',
                borderRadius: '8px',
                background: 'rgba(34,255,136,0.06)',
                border: '1px solid rgba(34,255,136,0.12)',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)',
                lineHeight: 1.5,
              }}
            >
              {summaryBlock}
            </motion.div>
          </div>
        </div>

        {/* Recent Buffer */}
        <div
          style={{
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid rgba(0,212,255,0.2)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            padding: '0.5rem 0.8rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-blue)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}>
            <span style={{ fontSize: '0.85rem' }}>&#x1F4AC;</span> RECENT BUFFER
          </div>
          <div style={{ padding: '0.6rem' }}>
            {recentMsgs.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  padding: '0.4rem 0.7rem',
                  borderRadius: '10px 10px 4px 10px',
                  background: 'rgba(0,212,255,0.1)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Arrow down */}
      <motion.div
        variants={fadeUp}
        style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--text-muted)' }}
      >
        &#x25BC; merged into context
      </motion.div>

      {/* Assembled context */}
      <motion.div
        variants={fadeUp}
        style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          border: '1px solid rgba(255,136,68,0.2)',
          padding: '0.7rem 1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
        }}
      >
        <div style={{ fontSize: '0.65rem', color: 'var(--accent-orange)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
          Final Prompt Sent to LLM
        </div>
        <div style={{ color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
          <span style={{ color: 'var(--accent-purple)' }}>[vector]</span>{' '}
          User prefers window seats. Is vegetarian, nut allergy. Budget ~$3k.
        </div>
        <div style={{ color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
          <span style={{ color: 'var(--accent-green)' }}>[summary]</span>{' '}
          Planning Japan trip in April. Kyoto, Osaka, Tokyo. Temples, food, cherry blossoms.
        </div>
        <div style={{ color: 'var(--text-primary)' }}>
          <span style={{ color: 'var(--accent-blue)' }}>[recent]</span>{' '}
          User: "Can you book me a flight to Tokyo?"
        </div>
        <div style={{ marginTop: '0.5rem', padding: '0.4rem 0.6rem', borderRadius: '8px', background: 'rgba(255,136,68,0.06)', border: '1px solid rgba(255,136,68,0.15)', color: 'var(--accent-orange)' }}>
          AI knows: window seat preference, vegetarian meal, budget, full trip context — all from different memory layers.
        </div>
      </motion.div>
    </motion.div>
  );
}
