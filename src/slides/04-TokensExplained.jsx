import { motion } from 'framer-motion';
import CodeBlock from '../components/CodeBlock';
import TokenCounter from '../interactive/TokenCounter';

const code = `import tiktoken

enc = tiktoken.encoding_for_model("gpt-4")
tokens = enc.encode("Hello, world!")

print(tokens)       # [9906, 11, 1917, 0]
print(len(tokens))  # 4 tokens`;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function TokensExplained() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <motion.h2 variants={fadeUp}>
        <span className="neon-text-green">Tokens</span>: The Unit of Memory
      </motion.h2>
      <motion.p variants={fadeUp}>
        LLMs don't see words — they see <strong>tokens</strong>. A token is roughly ¾ of a word. Context windows are measured in tokens, not characters.
      </motion.p>
      <motion.div variants={fadeUp}>
        <CodeBlock code={code} language="python" filename="tokenizer_demo.py" />
      </motion.div>
      <motion.div variants={fadeUp}>
        <TokenCounter />
      </motion.div>
    </motion.div>
  );
}
