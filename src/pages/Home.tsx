import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';
import { recipes } from '../data/recipes';

export default function Home() {
  const quickRecipes = recipes.slice(0, 4);

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="pb-24"
    >
      {/* HERO */}
      <div className="bg-surface pt-14 pb-12 border-b border-surface-container-high px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-fixed/30 text-primary font-body text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Evidence-based nutrition
            </div>
            <h1 className="text-display-lg text-on-surface mb-4">
              Eat well,<br />feel <em className="text-[#22c55e] italic">genuinely</em><br />alive.
            </h1>
            <p className="text-on-surface-variant text-body-lg mb-8 max-w-md leading-relaxed">
              Science-backed recipes, personalised meal plans, and nutrition guides written by registered dietitians — not algorithms.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link to="/meal-planner" className="bg-primary text-white px-6 py-3 rounded-md font-body font-semibold text-sm hover:opacity-90 transition-opacity">
                Build my meal plan ↗
              </Link>
              <Link to="/recipes" className="bg-transparent text-on-surface-variant px-6 py-3 rounded-md border border-outline-variant font-body font-normal text-sm hover:border-primary hover:text-primary transition-colors">
                Browse recipes
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="hidden lg:grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Using images for the right side visual since we omitted macros/plate method */}
            <div className="row-span-2 rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2000&auto=format&fit=crop" alt="Healthy bowl" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg h-48">
              <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2000&auto=format&fit=crop" alt="Salad" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg h-48">
              <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2000&auto=format&fit=crop" alt="Salmon" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="flex flex-col md:flex-row bg-surface border-b border-surface-container-high px-6 md:px-12 lg:px-24">
        {[
          { num: "2,400+", desc: "Tested recipes" },
          { num: "18", desc: "Specialist dietitians" },
          { num: "94%", desc: "Report better energy" },
          { num: "Free", desc: "Core meal planner" }
        ].map((stat, i) => (
          <div key={i} className={`flex-1 text-center py-6 md:py-8 ${i !== 3 ? 'md:border-r border-surface-container-high' : ''} ${i !== 3 ? 'border-b border-surface-container-high md:border-b-0' : ''}`}>
            <div className="font-headline text-2xl font-semibold text-primary">{stat.num}</div>
            <div className="text-xs text-on-surface-variant mt-1 font-body">{stat.desc}</div>
          </div>
        ))}
      </div>

      {/* CATEGORIES */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="font-headline text-2xl font-semibold text-on-surface">Browse by goal</h2>
          <Link to="/recipes" className="text-xs text-primary font-semibold hover:underline">See all &rarr;</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { icon: "🌿", bg: "bg-primary-fixed/30", name: "Anti-inflammatory", count: "148 articles" },
            { icon: "🦠", bg: "bg-[#FAEEDA]", name: "Gut health", count: "93 articles" },
            { icon: "⚖️", bg: "bg-[#FAECE7]", name: "Weight management", count: "211 articles" },
            { icon: "🥗", bg: "bg-[#E1F5EE]", name: "Plant-based", count: "176 articles" },
            { icon: "🏃", bg: "bg-[#FBEAF0]", name: "Sports nutrition", count: "84 articles" }
          ].map(cat => (
            <div key={cat.name} className="bg-surface border border-surface-container-high rounded-xl p-5 text-center cursor-pointer hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center text-xl ${cat.bg}`}>
                {cat.icon}
              </div>
              <div className="text-sm font-semibold text-on-surface">{cat.name}</div>
              <div className="text-xs text-on-surface-variant mt-1">{cat.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED ARTICLES */}
      <div className="bg-surface border-t border-surface-container-high py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="font-headline text-2xl font-semibold text-on-surface">Featured reads</h2>
            <Link to="/guide" className="text-xs text-primary font-semibold hover:underline">All articles &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2 bg-surface-container-lowest border border-surface-container-high rounded-xl overflow-hidden hover:shadow-lg transition-all group">
              <div className="h-56 bg-primary-fixed/30 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2000&auto=format&fit=crop" alt="Food" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5">
                <span className="inline-block text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded bg-primary-fixed/30 text-primary mb-3">Anti-inflammatory</span>
                <div className="font-headline text-lg font-semibold text-on-surface mb-2">The 12 most powerful anti-inflammatory foods, ranked by a dietitian</div>
                <div className="text-xs text-on-surface-variant">Dr. Amara Singh &middot; 8 min read</div>
              </div>
            </div>
            
            <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl overflow-hidden hover:shadow-lg transition-all group">
              <div className="h-36 bg-[#FAEEDA] overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2000&auto=format&fit=crop" alt="Food" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5">
                <span className="inline-block text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded bg-[#FAEEDA] text-[#854F0B] mb-3">Gut health</span>
                <div className="font-headline text-base font-semibold text-on-surface mb-2">Fermented foods: how much do you actually need?</div>
                <div className="text-xs text-on-surface-variant">Lena Koch &middot; 5 min read</div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl overflow-hidden hover:shadow-lg transition-all group">
              <div className="h-36 bg-[#FAECE7] overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2000&auto=format&fit=crop" alt="Food" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5">
                <span className="inline-block text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded bg-[#FAECE7] text-[#993C1D] mb-3">Protein</span>
                <div className="font-headline text-base font-semibold text-on-surface mb-2">Complete vs incomplete proteins — why it matters</div>
                <div className="text-xs text-on-surface-variant">James Okafor &middot; 6 min read</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MEAL PLANNER CTA */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 mb-16">
        <div className="bg-primary-fixed/30 border border-primary-fixed rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-headline text-xl flex font-semibold text-[#27500A] mb-2">Get your personalised 7-day meal plan</h3>
            <p className="text-sm text-primary max-w-lg">Answer 5 quick questions. We'll build a plan around your goals, allergies, and schedule.</p>
          </div>
          <Link to="/meal-planner" className="whitespace-nowrap bg-primary text-white px-6 py-3 rounded-md font-body font-semibold text-sm hover:opacity-90 transition-opacity">
            Build my plan ↗
          </Link>
        </div>
      </div>

      {/* RECIPES STRIP */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="font-headline text-2xl font-semibold text-on-surface">Quick & healthy recipes</h2>
          <Link to="/recipes" className="text-xs text-primary font-semibold hover:underline">All recipes &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickRecipes.map(recipe => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="bg-surface-container-lowest border border-surface-container-high rounded-xl overflow-hidden hover:shadow-lg transition-all group flex flex-col">
              <div className="h-40 overflow-hidden relative">
                <img src={recipe.img} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-primary shadow-sm uppercase tracking-wider">{recipe.tag}</div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="text-sm font-semibold text-on-surface mb-3 flex-1">{recipe.title}</div>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                  <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {recipe.time}</div>
                  <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
                  <div>{recipe.cals} KCAL</div>
                  <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
                  <div>{recipe.protein}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.main>
  );
}
