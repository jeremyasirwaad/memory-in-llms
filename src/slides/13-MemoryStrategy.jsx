import { motion } from 'framer-motion';
import SlideImage from '../components/SlideImage';
import MemoryStrategyFlowchart from '../interactive/MemoryStrategyFlowchart';
import strategyImg from '../assets/images/memory-strategy.webp';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function MemoryStrategy() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <motion.h2 variants={fadeUp}>
        Choosing a <span className="neon-text-purple">Memory Strategy</span>
      </motion.h2>
      <motion.p variants={fadeUp}>
        The right strategy depends on your use case. Try the interactive decision tree below:
      </motion.p>
      <motion.div variants={fadeUp}>
        <MemoryStrategyFlowchart />
      </motion.div>
    </motion.div>
  );
}
