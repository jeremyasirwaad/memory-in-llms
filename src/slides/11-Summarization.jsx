import { motion } from 'framer-motion';
import SlideImage from '../components/SlideImage';
import CodeBlock from '../components/CodeBlock';
import summaryImg from '../assets/images/summary+buffer.webp';

const code = `class SummaryMemory:
    def __init__(self, llm, max_tokens=4096):
        self.llm = llm
        self.summary = ""
        self.recent = []  # recent messages buffer

    def add(self, message):
        self.recent.append(message)
        if self.token_count() > self.max_tokens:
            # Summarize oldest messages
            old = self.recent[:len(self.recent)//2]
            self.summary = self.llm.summarize(
                self.summary, old
            )
            self.recent = self.recent[len(self.recent)//2:]`;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Summarization() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <motion.h2 variants={fadeUp}>
        Step 3: <span className="neon-text-green">Summarization</span>
      </motion.h2>
      <motion.p variants={fadeUp}>
        Instead of discarding old messages, <strong>compress them into a running summary</strong>. Preserves key information while staying within token limits.
      </motion.p>
      <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
        <SlideImage
          src={summaryImg}
          alt="Summary + buffer approach: old messages compressed into summaries"
          glow="green"
        />
        <CodeBlock code={code} language="python" filename="summary_memory.py" />
      </motion.div>
    </motion.div>
  );
}
