import { motion } from 'framer-motion';

const Skeleton = ({ 
  className = '', 
  variant = 'default',
  width,
  height,
  rounded = 'md'
}) => {
  const baseClasses = 'bg-slate-700/50 animate-pulse';
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  const variants = {
    default: 'h-4',
    text: 'h-4',
    title: 'h-8',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-64',
    image: 'h-48'
  };

  return (
    <motion.div
      className={`${baseClasses} ${variants[variant]} ${roundedClasses[rounded]} ${className}`}
      style={{ width, height }}
      animate={{
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
};

export const SkeletonCard = () => (
  <div className="glass-card rounded-2xl p-6 space-y-4">
    <Skeleton variant="avatar" className="mx-auto" />
    <Skeleton variant="title" width="80%" className="mx-auto" />
    <Skeleton variant="text" width="100%" />
    <Skeleton variant="text" width="90%" />
    <Skeleton variant="text" width="70%" />
  </div>
);

export const SkeletonBlogCard = () => (
  <div className="glass-card rounded-3xl overflow-hidden">
    <Skeleton variant="image" className="w-full" />
    <div className="p-6 space-y-4">
      <Skeleton variant="title" width="90%" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
      <div className="flex gap-4">
        <Skeleton variant="text" width="100px" />
        <Skeleton variant="text" width="80px" />
      </div>
    </div>
  </div>
);

export default Skeleton;
