import { motion } from 'framer-motion';
import SlideImage from '../components/SlideImage';
import lostImg from '../assets/images/lost-in-the-middle.webp';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function LostInTheMiddle() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <motion.h2 variants={fadeUp}>
        <span className="neon-text-pink">Lost in the Middle</span>
      </motion.h2>
      <motion.p variants={fadeUp}>
        Even with large windows, models pay more attention to the <strong>beginning</strong> and <strong>end</strong> of their context.
        Information buried in the middle is often overlooked — the "lost in the middle" problem.
      </motion.p>
      <motion.div variants={fadeUp}>
        <SlideImage
          src={lostImg}
          alt="Graph showing model accuracy drops for information placed in the middle of the context window"
          glow="pink"
        />
      </motion.div>
      <motion.p variants={fadeUp} style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.95rem' }}>
        This is why smart memory management matters more than just having a bigger window.
      </motion.p>
    </motion.div>
  );
}
