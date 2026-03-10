'use client';

const Spinner = ({ size = 'sm', color = 'white', className = '' }) => {
  const sizeClasses = {
    xs: 'w-3 h-3 border-[1.5px]',
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-[2.5px]',
    lg: 'w-8 h-8 border-3',
  };

  const colorClasses = {
    white: 'border-white/30 border-t-white',
    primary: 'border-primary/30 border-t-primary',
    slate: 'border-slate-200 dark:border-slate-700 border-t-slate-600 dark:border-t-slate-400',
  };

  return (
    <div
      className={`
        ${sizeClasses[size] || sizeClasses.sm}
        ${colorClasses[color] || colorClasses.white}
        rounded-full
        animate-spin
        ${className}
      `}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
