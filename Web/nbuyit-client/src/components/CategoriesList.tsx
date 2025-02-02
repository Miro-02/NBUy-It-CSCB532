export default function CategoriesList({ categories }: { categories: any[] }) {
    if (!categories?.length) return null;
  
    return (
      <div className="mb-2 text-sm text-gray-500">
        <div className="relative group">
          <div className="flex gap-1.5 overflow-hidden relative">
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white z-10" />
            {categories.slice(0, 3).map((category) => (
              <span 
                key={category.id}
                className="relative text-nowrap after:content-[','] last:after:content-none"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
  
        {categories.length > 3 && (
          <span className="text-gray-400 text-xs mt-1">
            + {categories.length - 3} more
          </span>
        )}
      </div>
    );
  }