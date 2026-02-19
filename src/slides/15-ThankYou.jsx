import { motion } from 'framer-motion';
import speakerPic from '../assets/images/speaker_pic.jpeg';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ThankYou() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.2rem',
      }}
    >
      <motion.h1
        variants={fadeUp}
        style={{
          background: 'linear-gradient(135deg, #00d4ff, #a855f7, #22ff88)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Thank You!
      </motion.h1>

      <motion.p
        variants={fadeUp}
        style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', color: 'var(--text-secondary)' }}
      >
        Questions?
      </motion.p>

      <motion.div
        variants={fadeUp}
        style={{
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid rgba(0,212,255,0.4)',
          boxShadow: '0 0 30px rgba(0,212,255,0.15)',
          marginTop: '0.5rem',
        }}
      >
        <img
          src={speakerPic}
          alt="Jeremy Asirwaad"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>

      <motion.h3
        variants={fadeUp}
        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: 'var(--text-primary)', margin: 0 }}
      >
        Jeremy Asirwaad
      </motion.h3>

      <motion.div variants={fadeUp}>
        <a
          href="https://www.linkedin.com/in/jeremy-asirwaad"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.3rem',
            borderRadius: '25px',
            background: 'var(--bg-card)',
            color: 'var(--accent-blue)',
            border: '1px solid rgba(0,212,255,0.3)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontFamily: 'var(--font-mono)',
            transition: 'box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.3)')}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Let's Connect
        </a>
      </motion.div>
    </motion.div>
  );
}
