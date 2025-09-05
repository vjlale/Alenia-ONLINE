import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ items = [] }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-2 text-sm text-alenia-light/70 mb-6"
      aria-label="Breadcrumb"
    >
      <Link 
        to="/" 
        className="flex items-center hover:text-alenia-primary transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-2"
        >
          <ChevronRight className="w-4 h-4 text-alenia-light/40" />
          {item.href ? (
            <Link 
              to={item.href}
              className="hover:text-alenia-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-alenia-primary font-medium">
              {item.label}
            </span>
          )}
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default Breadcrumbs;
