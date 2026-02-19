import { motion } from 'framer-motion';
import SlideImage from '../components/SlideImage';
import contextWindowImg from '../assets/images/what-is-context-window.webp';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function WhatIsContextWindow() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <motion.h2 variants={fadeUp}>
        The <span className="neon-text-purple">Context Window</span>
      </motion.h2>
      <motion.p variants={fadeUp}>
        The context window is the model's <strong>"working memory"</strong> — the maximum number of tokens it can see at once. Everything must fit inside this window, or it's invisible to the model.
      </motion.p>
      <motion.div variants={fadeUp}>
        <SlideImage
          src={contextWindowImg}
          alt="Context window diagram showing system prompt, conversation history, and response fitting within a fixed token limit"
          glow="purple"
        />
      </motion.div>
    </motion.div>
  );
}
