import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function RelatedPosts({ posts, currentPostId, onPostClick }) {
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3);

  return (
    <section className="mt-16">
      <h3 className="text-2xl font-bold text-white mb-8">Artículos relacionados</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => onPostClick && onPostClick(post)}
          >
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-lg">
                  {post.title.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 