import './SlideImage.css';

export default function SlideImage({ src, alt, caption, glow = 'blue' }) {
  return (
    <div className="slide-image-wrapper">
      <div className={`slide-image-frame glow-${glow}`}>
        <img src={src} alt={alt} />
      </div>
      {caption && <p className="slide-image-caption">{caption}</p>}
    </div>
  );
}
