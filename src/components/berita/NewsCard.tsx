import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaEye } from "react-icons/fa";

interface NewsCardProps {
  href: string;
  title: string;
  excerpt: string;
  date: string;
  views: number;
  category: string;
  categoryColor: string;
  backgroundGradient: string;
  emoji: string;
  isFeatured?: boolean;
  imageSrc?: string;
}

export default function NewsCard({
  href,
  title,
  excerpt,
  date,
  views,
  category,
  categoryColor,
  backgroundGradient,
  emoji,
  isFeatured = false,
  imageSrc
}: NewsCardProps) {
  if (isFeatured) {
    return (
      <Link
        href={href}
        className="block bg-white/10 backdrop-blur-lg text-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] group border border-white/20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          <div className="relative overflow-hidden">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={title}
                width={600}
                height={400}
                className="w-full h-72 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className={`w-full h-72 lg:h-full ${backgroundGradient} flex items-center justify-center relative`}>
                <span className="text-white text-6xl filter drop-shadow-lg">{emoji}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute top-6 left-6">
              <span className={`px-4 py-2 ${categoryColor} text-white text-sm font-semibold rounded-full shadow-lg`}>
                🔥 {category}
              </span>
            </div>
          </div>
          <div className="p-8 flex flex-col h-full">
            <div className="flex-grow">
              <h3 className="font-bold text-2xl lg:text-3xl mb-4 group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                {title}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg line-clamp-4">
                {excerpt}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4 pt-3">
              <div className="flex items-center gap-6 text-gray-400">
                <span className="flex items-center gap-2 text-sm">
                  <FaCalendarAlt className="text-blue-400" />
                  {date}
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <FaEye className="text-green-400" />
                  {views} views
                </span>
              </div>
              <span className="text-blue-300 font-semibold hover:text-blue-200 transition-colors hidden md:inline-block">
                Baca Selengkapnya →
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="bg-white/10 backdrop-blur-lg text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] group border border-white/20 flex flex-col h-full"
    >
      <div className="relative overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            width={400}
            height={250}
            className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-52 ${backgroundGradient} flex items-center justify-center relative`}>
            <span className="text-white text-5xl filter drop-shadow-lg">{emoji}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>
        )}
        <span className={`absolute top-4 right-4 px-3 py-1 ${categoryColor} text-white text-xs font-semibold rounded-full shadow-lg`}>
          {category}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-bold text-xl mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-300 mb-4 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-400 pt-3 mt-auto rounded-b-lg -mx-1 px-3 py-2">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-blue-400" />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <FaEye className="text-green-400" />
            {views} views
          </span>
        </div>
      </div>
    </Link>
  );
}
