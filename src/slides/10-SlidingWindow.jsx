import { motion } from 'framer-motion';
import SlideImage from '../components/SlideImage';
import SlidingWindowAnimation from '../interactive/SlidingWindowAnimation';
import slidingWindowImg from '../assets/images/sliding-window.webp';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SlidingWindow() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <motion.h2 variants={fadeUp}>
        Step 2: <span className="neon-text-purple">Sliding Window</span>
      </motion.h2>
      <motion.p variants={fadeUp}>
        Keep only the <strong>K most recent</strong> messages. A fixed-size window that "slides" forward as new messages arrive.
      </motion.p>
      <motion.div variants={fadeUp}>
        <SlideImage
          src={slidingWindowImg}
          alt="Sliding window keeping the most recent messages while dropping older ones"
          glow="purple"
        />
      </motion.div>
      <motion.div variants={fadeUp}>
        <SlidingWindowAnimation />
      </motion.div>
    </motion.div>
  );
}
