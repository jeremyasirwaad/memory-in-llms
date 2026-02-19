import { useSlideNavigation } from './hooks/useSlideNavigation';
import SlideShell from './components/SlideShell';
import ProgressBar from './components/ProgressBar';
import SLIDES from './slides';
import './App.css';

export default function App() {
  const { currentSlide, direction, goTo, totalSlides } = useSlideNavigation(SLIDES.length);
  const SlideComponent = SLIDES[currentSlide];

  return (
    <div className="presentation">
      <SlideShell slideIndex={currentSlide} direction={direction}>
        <SlideComponent />
      </SlideShell>
      <ProgressBar current={currentSlide} total={totalSlides} onNavigate={goTo} />
    </div>
  );
}
