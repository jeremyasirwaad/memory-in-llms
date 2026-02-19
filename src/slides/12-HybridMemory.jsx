import { motion } from 'framer-motion';
import SlideImage from '../components/SlideImage';
import hybridImg from '../assets/images/hybrid-systems.webp';
import vectorImg from '../assets/images/vector-usage.webp';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function HybridMemory() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <motion.h2 variants={fadeUp}>
        <span className="neon-text-orange">Hybrid</span> Memory Systems
      </motion.h2>
      <motion.p variants={fadeUp}>
        Real-world systems combine multiple strategies. A typical production setup uses <strong>vector search</strong> for long-term recall plus a <strong>buffer or summary</strong> for the current session.
      </motion.p>
      <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <SlideImage
          src={hybridImg}
          alt="Hybrid memory system combining multiple memory strategies"
          glow="purple"
          caption="Hybrid architecture overview"
        />
        <SlideImage
          src={vectorImg}
          alt="Vector database usage for semantic memory retrieval"
          caption="Vector store for long-term recall"
        />
      </motion.div>
    </motion.div>
  );
}
