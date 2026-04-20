import './Skeleton.css';

interface SkeletonProps {
  type?: 'text' | 'circle' | 'rect' | 'btn' | 'carta-item';
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  className?: string;
}

export function Skeleton({ type = 'text', width, height, style, className = '' }: SkeletonProps) {
  const inlineStyle: React.CSSProperties = {
    ...style,
    width: width ?? style?.width,
    height: height ?? style?.height,
  };

  return (
    <div 
      className={`skeleton skeleton-${type} ${className}`} 
      style={inlineStyle} 
    />
  );
}
