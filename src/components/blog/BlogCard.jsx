import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogCard({ title, excerpt, date, readTime, category, link, image }) {
  return (
    <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        {category && (
          <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
            {category}
          </span>
        )}
        <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-slate-600 mb-4 line-clamp-3">
          {excerpt}
        </p>
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {readTime} min
          </span>
        </div>
        <a 
          href={link}
          className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
        >
          Leer más
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </article>
  );
}
