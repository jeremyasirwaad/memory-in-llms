import './ProgressBar.css';

export default function ProgressBar({ current, total, onNavigate }) {
  const progress = ((current + 1) / total) * 100;

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width;
    const slideIndex = Math.floor(ratio * total);
    onNavigate(Math.min(Math.max(slideIndex, 0), total - 1));
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-track" onClick={handleClick}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <span className="progress-counter">
        {current + 1} / {total}
      </span>
    </div>
  );
}
