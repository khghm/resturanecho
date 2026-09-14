import { useState, useEffect, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  height?: string;
}

export function Carousel({
  children,
  autoPlay = true,
  interval = 5000,
  showDots = true,
  showArrows = true,
  className = '',
  height = 'h-64',
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoPlay || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % children.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, isHovered, children.length]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const goNext = () => {
    setCurrentIndex(prev => (prev + 1) % children.length);
  };

  const goPrev = () => {
    setCurrentIndex(prev => (prev - 1 + children.length) % children.length);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative ${height} transition-all duration-700 ease-out`}>
        {children.map((child, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentIndex
                ? 'opacity-100 translate-x-0 scale-100'
                : index < currentIndex
                ? 'opacity-0 -translate-x-full scale-95'
                : 'opacity-0 translate-x-full scale-95'
            }`}
          >
            {child}
          </div>
        ))}
      </div>

      {showArrows && children.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={goNext}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        </>
      )}

      {showDots && children.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-white shadow-md'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface CarouselItemProps {
  image: string;
  title?: string;
  subtitle?: string;
  overlay?: 'dark' | 'gradient' | 'none';
  children?: ReactNode;
}

export function CarouselItem({ image, title, subtitle, overlay = 'gradient', children }: CarouselItemProps) {
  return (
    <div className="relative w-full h-full">
      <img src={image} alt={title || ''} className="w-full h-full object-cover" />
      {overlay === 'dark' && (
        <div className="absolute inset-0 bg-black/40"></div>
      )}
      {overlay === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      )}
      {(title || subtitle || children) && (
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {children}
          {title && <h3 className="text-white text-xl font-bold mb-1">{title}</h3>}
          {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
        </div>
      )}
    </div>
  );
}
