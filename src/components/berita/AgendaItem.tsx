interface AgendaItemProps {
  title: string;
  organizer: string;
  location: string;
  date: string;
  time: string;
}

export default function AgendaItem({
  title,
  organizer,
  location,
  date,
  time
}: AgendaItemProps) {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 text-black rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-blue-100">
      <h3 className="font-bold text-lg mb-3 text-gray-800 flex items-center gap-2">
        <span className="text-blue-600">📅</span> {title}
      </h3>
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
          <strong>Oleh:</strong> {organizer}
        </p>
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
          <strong>Di:</strong> {location}
        </p>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-blue-600 bg-blue-100 font-semibold px-3 py-1 rounded-full">
          {date}
        </span>
        <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {time}
        </span>
      </div>
    </div>
  );
}
