interface AgendaItemProps {
  title: string;
  organizer: string;
  location: string;
  date: string;
  time: string;
  emoji: string;
  gradientClass: string;
  borderClass: string;
  dateColorClass: string;
}

export default function AgendaItem({
  title,
  organizer,
  location,
  date,
  time,
  emoji,
  gradientClass,
  borderClass,
  dateColorClass
}: AgendaItemProps) {
  return (
    <div className={`${gradientClass} text-black rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${borderClass}`}>
      <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
        {emoji} {title}
      </h3>
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
          <strong>Oleh:</strong> {organizer}
        </p>
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          <strong>Di:</strong> {location}
        </p>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className={`${dateColorClass} font-semibold px-3 py-1 rounded-full`}>
          {date}
        </span>
        <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {time}
        </span>
      </div>
    </div>
  );
}
