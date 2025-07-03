'use client';

interface MobileSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function MobileSidebar({ activeSection, onSectionChange }: MobileSidebarProps) {
  const sections = [
    { id: '01', title: 'Beranda', label: 'BERANDA' },
    { id: '02', title: 'Fitur-Fitur Website', label: 'FITUR-FITUR' },
    { id: '03', title: 'Struktur', label: 'Struktur' },
    { id: '04', title: 'Galeri', label: 'Galeri' },
    { id: '05', title: 'Statistik', label: 'Statistik' },
  ];

  return (
    <div className="md:hidden fixed left-0 top-1/2 transform -translate-y-1/2 z-[100]">
      <div className="flex flex-col space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`group relative flex items-center ${
              activeSection === section.id
                ? 'text-white'
                : 'text-white/60 hover:text-white/80'
            } transition-all duration-300`}
          >
            {/* Red line indicator */}
            <div
              className={`w-1 h-8 transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-red-500'
                  : 'bg-white/20 group-hover:bg-white/40'
              }`}
            />
            
            {/* Section number */}
            <div className="ml-2 flex flex-col justify-center min-w-[40px]">
              <span
                className={`text-lg font-bold transition-all duration-300 ${
                  activeSection === section.id
                    ? 'text-white'
                    : 'text-white/40 group-hover:text-white'
                }`}
              >
                {section.id}
              </span>
              {section.label && (
                <span
                  className={`text-xs uppercase tracking-wider transition-all duration-300 ${
                    activeSection === section.id
                      ? 'text-white'
                      : 'text-white/60'
                  }`}
                >
                  {section.label}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}