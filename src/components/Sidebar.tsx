'use client';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const sections = [
    { id: '01', title: 'Beranda', label: 'Beranda' },
    { id: '02', title: '', label: '' },
    { id: '03', title: '', label: '' },
    { id: '04', title: '', label: '' },
    { id: '05', title: '', label: '' },
  ];

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex flex-col space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => section.id === '01' && onSectionChange(section.id)}
            className={`group relative flex items-center ${
              activeSection === section.id
                ? 'text-white'
                : 'text-white/60 hover:text-white/80'
            } transition-all duration-300`}
            disabled={section.id !== '01'}
          >
            {/* Red line indicator */}
            <div
              className={`w-1 h-12 transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-red-500'
                  : 'bg-white/20 group-hover:bg-white/40'
              }`}
            />
            
            {/* Section number */}
            <div className="ml-4 flex flex-col justify-center min-w-[60px]">
              <span
                className={`text-3xl font-bold transition-all duration-300 ${
                  activeSection === section.id
                    ? 'text-white'
                    : 'text-white/40'
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
