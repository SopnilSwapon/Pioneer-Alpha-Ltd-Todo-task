export default function TodoSkeleton() {
  return (
    <div className="animate-pulse bg-white border border-gray-200 rounded-xl p-5 shadow-sm w-full h-[200px]">
      <div className="h-5 bg-gray-200 rounded w-2/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-5"></div>

      <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>

      <div className="flex gap-3">
        <div className="h-9 w-9 rounded-lg bg-gray-200"></div>
        <div className="h-9 w-9 rounded-lg bg-gray-200"></div>
      </div>
    </div>
  );
}
