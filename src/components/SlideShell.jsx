import { motion, AnimatePresence } from 'framer-motion';
import './SlideShell.css';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? '60%' : '-60%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? '-60%' : '60%',
    opacity: 0,
  }),
};

export default function SlideShell({ slideIndex, direction, children }) {
  return (
    <AnimatePresence custom={direction} mode="wait">
      <motion.div
        key={slideIndex}
        className="slide-shell"
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="slide-content">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
