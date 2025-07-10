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
    <div className="md:hidden fixed left-2 top-1/2 transform -translate-y-1/2 z-[100]">
      <div className="flex flex-col space-y-1">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`group relative flex items-center ${
                isActive 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white/80'
              } transition-all duration-300`}
            >
              {/* Yellow line indicator */}
              <div className={`w-1 h-6 transition-all duration-300 ${
                isActive 
                  ? 'bg-yellow-400' 
                  : 'bg-white/20 group-hover:bg-white/40'
              }`} />
              
              {/* Section number */}
              <div className="ml-2 flex flex-col justify-center min-w-[25px]">
                <span className={`text-xs font-bold transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-white/40'
                }`}>
                  {`0${index + 1}`}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}