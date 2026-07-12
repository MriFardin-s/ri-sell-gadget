export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md p-4 sm:p-6 lg:p-8 animate-pulse">
        <div className="sm:flex sm:items-center sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-5 mb-6">
          <div className="space-y-3 w-full sm:w-1/3">
            <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2"></div>
          </div>
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-full w-20 mt-4 sm:mt-0 self-end sm:self-auto"></div>
        </div>

    
        <div className="grid grid-cols-1 gap-4 sm:hidden">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="h-14 w-20 bg-neutral-200 dark:bg-neutral-800 rounded flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4"></div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-3 mt-1">
                <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-12"></div>
                <div className="flex gap-2">
                  <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded w-12"></div>
                  <div className="h-7 bg-neutral-200 dark:bg-neutral-800 rounded w-14"></div>
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="hidden sm:block overflow-x-auto">
          <div className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
      
            <div className="bg-neutral-50 dark:bg-neutral-950 h-12 flex items-center px-6 gap-4">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-16"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-32"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-16"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-16"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-20 ml-auto"></div>
            </div>
            
          
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 flex items-center px-6 gap-4">
                  <div className="h-12 w-16 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-40"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-12"></div>
                  <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded w-14"></div>
                  <div className="flex gap-3 ml-auto">
                    <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-14"></div>
                    <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}