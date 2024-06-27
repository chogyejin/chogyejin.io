export function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 my-1">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="text-sm text-white bg-gray-400 dark:bg-gray-600 rounded-lg px-2 truncate"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
