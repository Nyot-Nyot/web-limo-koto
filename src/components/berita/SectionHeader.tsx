interface SectionHeaderProps {
  title: string;
  gradientColors: string;
  lineGradient: string;
}

export default function SectionHeader({ 
  title, 
  gradientColors, 
  lineGradient 
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
      <div className={`w-1 h-6 md:h-8 ${lineGradient} rounded-full`}></div>
      <h2 className={`text-2xl md:text-3xl font-bold ${gradientColors} bg-clip-text text-transparent`}>
        {title}
      </h2>
    </div>
  );
}
