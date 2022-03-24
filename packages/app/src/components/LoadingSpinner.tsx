import { BubbleLoading } from './Icons';

const LoadingSpinner = () => {
  return (
    <div
      className="flex justify-center items-center w-[inherit] h-[inherit] min-h-[inherit]"
      aria-label="loading"
    >
      <BubbleLoading className="text-blue-700 text-4xl" />
    </div>
  );
};

export default LoadingSpinner;
