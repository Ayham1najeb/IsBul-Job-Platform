/**
 * Skeleton Loader Bileşeni
 * Yükleme durumları için skeleton screen
 */
const Skeleton = ({ className = '', variant = 'default' }) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const variants = {
    default: 'h-4 w-full',
    text: 'h-4 w-full',
    title: 'h-8 w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-48 w-full',
    button: 'h-10 w-24 rounded-lg',
    circle: 'h-12 w-12 rounded-full',
  };
  
  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      aria-label="Yükleniyor..."
      role="status"
    >
      <span className="sr-only">Yükleniyor...</span>
    </div>
  );
};

export default Skeleton;

