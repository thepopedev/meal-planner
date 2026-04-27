import { useState } from 'react';
import { Search, ArrowRight, ArrowUpDown, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { recipes } from '../data/recipes';

export default function Recipes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryNeeds, setDietaryNeeds] = useState<string[]>([]);
  const [timeLimit, setTimeLimit] = useState<string>('Any duration');
  const [focusGoal, setFocusGoal] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  
  const filteredRecipes = recipes.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tag.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesDietary = dietaryNeeds.every(need => r.dietaryNeeds?.includes(need));
    
    let matchesTime = true;
    if (timeLimit === 'Under 15 mins') matchesTime = r.timeCategory === 'Under 15 mins';
    else if (timeLimit === 'Under 30 mins') matchesTime = r.timeCategory === 'Under 15 mins' || r.timeCategory === 'Under 30 mins';

    const matchesFocus = focusGoal ? r.focusGoal === focusGoal : true;
    
    return matchesSearch && matchesDietary && matchesTime && matchesFocus;
  });

  const displayedRecipes = filteredRecipes.slice(0, visibleCount);

  const toggleDietaryNeed = (need: string) => {
    setDietaryNeeds(prev => 
      prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]
    );
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-[1280px] mx-auto px-8 py-16"
    >
      {/* Hero Search Area */}
      <section className="mb-20 text-center max-w-2xl mx-auto">
        <h1 className="text-headline-xl text-on-background mb-6">Find Your Next Whole Meal</h1>
        <p className="text-body-lg text-on-surface-variant mb-10">Scientifically crafted recipes designed for longevity, clarity, and culinary delight.</p>
        <div className="relative flex items-center shadow-xl rounded-2xl overflow-hidden bg-white">
          <Search className="absolute left-6 text-on-surface-variant w-6 h-6" />
          <input 
            className="w-full pl-16 pr-6 py-6 text-body-lg border-none focus:outline-none focus:ring-0 text-on-surface" 
            placeholder="Search by ingredient, health goal, or cuisine..." 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-primary text-on-primary px-10 py-6 font-bold hover:bg-primary-container transition-colors">
            EXPLORE
          </button>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-32 space-y-12 pb-8 pr-2">
            <div>
              <h3 className="text-label-caps text-on-surface-variant mb-6 uppercase">Dietary Needs</h3>
              <div className="space-y-4">
                {['Plant-Based', 'Gluten-Free', 'Anti-Inflammatory', 'Low Glycemic'].map((item) => (
                  <label key={item} className="flex items-center group cursor-pointer">
                    <input 
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary accent-primary" 
                      type="checkbox" 
                      checked={dietaryNeeds.includes(item)}
                      onChange={() => toggleDietaryNeed(item)}
                    />
                    <span className="ml-3 text-body-md text-on-surface group-hover:text-primary transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-label-caps text-on-surface-variant mb-6 uppercase">Time</h3>
              <div className="space-y-4">
                {['Under 15 mins', 'Under 30 mins', 'Any duration'].map((item) => (
                  <label key={item} className="flex items-center group cursor-pointer">
                    <input 
                      className="w-5 h-5 border-outline-variant text-primary focus:ring-primary accent-primary" 
                      name="time" 
                      type="radio" 
                      checked={timeLimit === item}
                      onChange={() => setTimeLimit(item)}
                    />
                    <span className="ml-3 text-body-md text-on-surface group-hover:text-primary transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-label-caps text-on-surface-variant mb-6 uppercase">Focus Goal</h3>
              <div className="flex flex-wrap gap-2">
                {['Energy', 'Muscle Recovery', 'Cognitive Health', 'Digestive Ease', 'Better Sleep'].map((item) => {
                  const isActive = focusGoal === item;
                  return (
                    <span 
                      key={item}
                      onClick={() => setFocusGoal(isActive ? null : item)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all ${
                        isActive 
                          ? 'bg-primary text-on-primary' 
                          : 'bg-secondary-container text-on-secondary-container hover:bg-primary hover:text-white'
                      }`}
                    >
                      {item}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Recipe Grid */}
        <div className="flex-grow">
          <div className="flex justify-between items-baseline mb-10 border-b border-surface-container-high pb-4">
            <p className="text-body-md text-on-surface-variant italic">Showing {filteredRecipes.length} curated results</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-label-caps text-primary">
                <ArrowUpDown className="w-4 h-4" /> RELEVANCE
              </button>
            </div>
          </div>

          {displayedRecipes.length === 0 && (
            <div className="text-center py-20 text-on-surface-variant italic">
              No recipes match your current filters. Try relaxing your criteria.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {displayedRecipes.map((recipe) => (
              <article key={recipe.id} className="group recipe-card-hover recipe-card-shadow rounded-xl overflow-hidden bg-white flex flex-col">
                <div className="relative h-72 overflow-hidden flex-shrink-0">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    src={recipe.img} 
                    alt={recipe.title} 
                  />
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <div className={`absolute bottom-4 left-4 px-3 py-1 text-white text-xs font-bold uppercase tracking-wider rounded ${recipe.tagColor || 'bg-primary'}`}>
                    {recipe.tag}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h2 className="text-headline-md text-xl text-on-surface mb-3">{recipe.title}</h2>
                  <p className="text-on-surface-variant text-body-md mb-6 line-clamp-2 flex-grow">{recipe.desc}</p>
                  
                  <div className="flex items-center justify-between border-t border-surface-container-high pt-6 mt-auto">
                    <div className="flex gap-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-label-caps text-tertiary">PREP</span>
                        <span className="font-bold text-on-surface text-sm">{recipe.time}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-label-caps text-tertiary">CALORIES</span>
                        <span className="font-bold text-on-surface text-sm">{recipe.cals}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-label-caps text-tertiary">PROTEIN</span>
                        <span className="font-bold text-on-surface text-sm">{recipe.protein}</span>
                      </div>
                    </div>
                    <Link to={`/recipe/${recipe.id}`} aria-label={`View ${recipe.title}`}>
                      <ArrowRight className="w-6 h-6 text-on-surface-variant group-hover:text-primary transition-colors cursor-pointer" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {visibleCount < filteredRecipes.length && (
            <div className="mt-20 flex justify-center">
              <button 
                onClick={loadMore}
                className="flex items-center gap-4 bg-transparent border-2 border-primary text-primary px-12 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300"
              >
                LOAD MORE RECIPES
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.main>
  );
}
