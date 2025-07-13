import React, { memo } from 'react';
import { ContactItem } from '@/types/layanan';


interface ContactCardProps {
  title: string;
  items: ContactItem[];
  type: 'primary' | 'emergency';
}

const ContactCard = memo<ContactCardProps>(({ title, items, type }) => (
  <div className={`bg-white/10 backdrop-blur-lg border ${
    type === 'emergency' ? 'border-red-500/30' : 'border-white/20'
  } rounded-2xl p-6 hover:shadow-xl transition-all duration-300`}>
    <h3 className={`text-xl font-bold mb-6 ${
      type === 'emergency' ? 'text-red-400' : 'text-yellow-400'
    }`}>
      {title}
    </h3>
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${
            type === 'emergency' ? 'bg-red-500/20' : 'bg-blue-500/20'
          }`}>
            <item.icon className={`text-lg ${item.color}`} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-300">{item.label}</p>
            <p className="text-white font-medium">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
));

ContactCard.displayName = 'ContactCard';

export default ContactCard;
