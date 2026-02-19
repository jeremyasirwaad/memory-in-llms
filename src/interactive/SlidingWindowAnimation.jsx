import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SlidingWindowAnimation.css';

const MESSAGES = [
  { role: 'user', text: 'Hi there!' },
  { role: 'assistant', text: 'Hello! How can I help?' },
  { role: 'user', text: "What's 2+2?" },
  { role: 'assistant', text: "It's 4!" },
  { role: 'user', text: 'Tell me a joke' },
  { role: 'assistant', text: 'Why did the function break up with the variable? Too many arguments!' },
  { role: 'user', text: "That's funny!" },
  { role: 'assistant', text: 'Glad you liked it!' },
  { role: 'user', text: "What's ML?" },
  { role: 'assistant', text: 'Machine Learning is a branch of AI that learns from data.' },
  { role: 'user', text: 'Thanks!' },
  { role: 'assistant', text: "You're welcome!" },
];

const WINDOW_SIZE = 5;
const PLAY_INTERVAL = 1500;

export default function SlidingWindowAnimation() {
  // step represents how many messages have entered so far (0 = empty, MESSAGES.length = all entered)
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  const maxStep = MESSAGES.length;

  // Derive visible and evicted messages from step
  const endIndex = step;
  const startIndex = Math.max(0, endIndex - WINDOW_SIZE);
  const windowMessages = MESSAGES.slice(startIndex, endIndex);
  const evictedMessages = MESSAGES.slice(0, startIndex);

  const stepForward = useCallback(() => {
    setStep((s) => {
      if (s >= maxStep) {
        setIsPlaying(false);
        return s;
      }
      return s + 1;
    });
  }, [maxStep]);

  const stepBack = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    setStep(0);
    setIsPlaying(false);
  }, []);

  const goToEnd = useCallback(() => {
    setStep(maxStep);
    setIsPlaying(false);
  }, [maxStep]);

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => {
      // If already at end, reset before playing
      if (!p) {
        setStep((s) => {
          if (s >= maxStep) return 0;
          return s;
        });
      }
      return !p;
    });
  }, [maxStep]);

  // Auto-play interval
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setStep((s) => {
          if (s >= maxStep) {
            setIsPlaying(false);
            return s;
          }
          return s + 1;
        });
      }, PLAY_INTERVAL);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, maxStep]);

  return (
    <div className="sliding-window">
      {/* Step counter */}
      <div className="sliding-window__counter">
        <span className="sliding-window__counter-label">Step</span>
        <span className="sliding-window__counter-value">{step}</span>
        <span className="sliding-window__counter-sep">/</span>
        <span className="sliding-window__counter-total">{maxStep}</span>
      </div>

      {/* Main visualization area */}
      <div className="sliding-window__stage">
        {/* Evicted messages */}
        <div className="sliding-window__evicted">
          <AnimatePresence>
            {evictedMessages.map((msg, i) => (
              <motion.div
                key={`evicted-${i}`}
                className={`sliding-window__msg sliding-window__msg--evicted sliding-window__msg--${msg.role}`}
                initial={{ opacity: 0.5, x: 0 }}
                animate={{ opacity: 0.25, x: 0 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <span className="sliding-window__msg-role">
                  {msg.role === 'user' ? 'U' : 'A'}
                </span>
                <span className="sliding-window__msg-text">{msg.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {evictedMessages.length > 0 && (
            <div className="sliding-window__evicted-label">Forgotten</div>
          )}
        </div>

        {/* Window box */}
        <div className="sliding-window__window">
          <div className="sliding-window__window-header">
            <span className="sliding-window__window-title">Context Window</span>
            <span className="sliding-window__window-size">
              {windowMessages.length}/{WINDOW_SIZE}
            </span>
          </div>
          <div className="sliding-window__window-body">
            <AnimatePresence mode="popLayout">
              {windowMessages.map((msg, i) => {
                const globalIndex = startIndex + i;
                return (
                  <motion.div
                    key={`msg-${globalIndex}`}
                    className={`sliding-window__msg sliding-window__msg--active sliding-window__msg--${msg.role}`}
                    initial={{ opacity: 0, x: 80, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -80, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    layout
                  >
                    <span className="sliding-window__msg-role">
                      {msg.role === 'user' ? 'U' : 'A'}
                    </span>
                    <span className="sliding-window__msg-text">{msg.text}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {windowMessages.length === 0 && (
              <div className="sliding-window__empty">
                Press play or step forward
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="sliding-window__controls">
        <button
          className="sliding-window__btn"
          onClick={reset}
          aria-label="Reset"
          title="Reset"
        >
          &#x27F2;
        </button>
        <button
          className="sliding-window__btn"
          onClick={stepBack}
          disabled={step <= 0}
          aria-label="Step back"
          title="Step Back"
        >
          &#x25C0;
        </button>
        <button
          className="sliding-window__btn sliding-window__btn--play"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '\u23F8' : '\u25B6'}
        </button>
        <button
          className="sliding-window__btn"
          onClick={stepForward}
          disabled={step >= maxStep}
          aria-label="Step forward"
          title="Step Forward"
        >
          &#x25B6;
        </button>
        <button
          className="sliding-window__btn"
          onClick={goToEnd}
          aria-label="Go to end"
          title="Go to End"
        >
          &#x23ED;
        </button>
      </div>
    </div>
  );
}
