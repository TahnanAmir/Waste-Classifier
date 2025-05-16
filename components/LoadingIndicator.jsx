export default function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center my-4">
      <div className="inline-block relative w-10 h-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-10 h-10 rounded-full border-4 border-primary-200"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full animate-spin">
          <div className="w-10 h-10 rounded-full border-t-4 border-primary-500"></div>
        </div>
      </div>
      <p className="ml-3 text-primary-700 font-medium">Analyzing image...</p>
    </div>
  );
} 