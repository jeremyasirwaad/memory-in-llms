import { motion } from 'framer-motion';
import SlideImage from '../components/SlideImage';
import CodeBlock from '../components/CodeBlock';
import fullBufferImg from '../assets/images/full-buffer.webp';

const code = `class BufferMemory:
    def __init__(self, max_tokens=4096):
        self.messages = []
        self.max_tokens = max_tokens

    def add(self, message):
        self.messages.append(message)
        # Trim oldest when over limit
        while self.token_count() > self.max_tokens:
            self.messages.pop(0)`;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function BufferingTrimming() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <motion.h2 variants={fadeUp}>
        Step 1: <span className="neon-text-blue">Buffering & Trimming</span>
      </motion.h2>
      <motion.p variants={fadeUp}>
        The simplest approach: store every message. When the buffer exceeds the token limit, <strong>trim from the front</strong> (oldest first).
      </motion.p>
      <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
        <SlideImage
          src={fullBufferImg}
          alt="Buffer memory filling up and trimming oldest messages"
          glow="blue"
        />
        <CodeBlock code={code} language="python" filename="buffer_memory.py" />
      </motion.div>
    </motion.div>
  );
}
