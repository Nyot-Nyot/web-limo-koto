import AgendaItem from "./AgendaItem";
import { AgendaItem as AgendaItemType } from "@/data/newsData";

interface AgendaSidebarProps {
  agendaData: AgendaItemType[];
}

export default function AgendaSidebar({ agendaData }: AgendaSidebarProps) {
  return (
    <aside className="xl:col-span-1">
      <div className="sticky top-24">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-500 rounded-full"></div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Agenda Terkini
            </h2>
          </div>
          <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
            {agendaData.map((agenda) => (
              <AgendaItem
                key={agenda.id}
                title={agenda.title}
                organizer={agenda.organizer}
                location={agenda.location}
                date={agenda.date}
                time={agenda.time}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
