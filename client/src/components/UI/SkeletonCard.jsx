/**
 * Skeleton Card Bileşeni
 * Kart yükleme durumları için
 */
import Skeleton from './Skeleton';

const SkeletonCard = ({ type = 'job' }) => {
  if (type === 'job') {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="flex items-start gap-4">
          <Skeleton variant="avatar" />
          <div className="flex-1 space-y-3">
            <Skeleton variant="title" />
            <Skeleton variant="text" />
            <Skeleton variant="text" className="w-2/3" />
            <div className="flex gap-2">
              <Skeleton variant="button" className="w-20" />
              <Skeleton variant="button" className="w-20" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (type === 'company') {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="flex items-center gap-4">
          <Skeleton variant="avatar" className="h-16 w-16" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="title" />
            <Skeleton variant="text" className="w-1/2" />
            <Skeleton variant="text" className="w-1/3" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
      <Skeleton variant="card" />
      <div className="mt-4 space-y-2">
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-3/4" />
      </div>
    </div>
  );
};

export default SkeletonCard;

