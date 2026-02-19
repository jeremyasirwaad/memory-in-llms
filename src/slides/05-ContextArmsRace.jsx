import { motion } from 'framer-motion';
import ContextWindowComparison from '../interactive/ContextWindowComparison';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ContextArmsRace() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <motion.h2 variants={fadeUp}>
        The Context Window <span className="neon-text-orange">Arms Race</span>
      </motion.h2>
      <motion.p variants={fadeUp}>
        Models have gone from 4K to 2M tokens in just two years. But bigger isn't always better...
      </motion.p>
      <motion.div variants={fadeUp}>
        <ContextWindowComparison />
      </motion.div>
    </motion.div>
  );
}
