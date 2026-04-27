import { Link, useLocation } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function Navbar() {
  const location = useLocation();

  return (
    <motion.header 
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#FCFAF7] border-b border-[#E8F0E5] sticky top-0 z-50"
    >
      <nav className="max-w-[1280px] mx-auto flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-bold italic text-primary font-[Noto_Serif]">Nourish</Link>
          <div className="hidden md:flex items-center gap-8 font-body text-base tracking-tight">
            <Link 
              to="/recipes" 
              className={`${location.pathname === '/recipes' ? 'text-primary border-b-2 border-primary pb-1 font-bold' : 'text-stone-600 hover:text-primary transition-opacity duration-300'}`}
            >
              Recipes
            </Link>
            <Link 
              to="/meal-planner" 
              className={`${location.pathname === '/meal-planner' ? 'text-primary border-b-2 border-primary pb-1 font-bold' : 'text-stone-600 hover:text-primary transition-opacity duration-300'}`}
            >
              Meal Planner
            </Link>
            <Link 
              to="/guide" 
              className={`${location.pathname === '/guide' ? 'text-primary border-b-2 border-primary pb-1 font-bold' : 'text-stone-600 hover:text-primary transition-opacity duration-300'}`}
            >
              Guides
            </Link>
            <Link 
              to="/tracking" 
              className={`${location.pathname === '/tracking' ? 'text-primary border-b-2 border-primary pb-1 font-bold' : 'text-stone-600 hover:text-primary transition-opacity duration-300'}`}
            >
              Tracking
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-primary hover:opacity-80 transition-opacity">
            <User className="w-6 h-6" />
          </button>
          <Link to="/meal-planner" className="bg-[#163810] text-white px-8 py-2.5 rounded-full font-bold hover:opacity-90 transition-opacity text-sm tracking-wide">
            Meal Planner
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
