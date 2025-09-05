import { Calendar, Clock, ArrowRight, Eye, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogCard({ title, excerpt, date, readTime, category, link, image, featured, onReadMore }) {
  return (
    <motion.article 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      {image && (
        <div className="h-48 overflow-hidden relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Tag className="w-3 h-3" />
                Destacado
              </span>
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        {category && (
          <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
            {category}
          </span>
        )}
        <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 mb-4 line-clamp-3">
          {excerpt}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {readTime} min
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-slate-400">
            <Eye className="w-4 h-4" />
            <span>1.2k</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button 
            onClick={onReadMore}
            className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
          >
            Leer más
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-green-600 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </button>
            <button className="p-2 text-slate-400 hover:text-green-600 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
