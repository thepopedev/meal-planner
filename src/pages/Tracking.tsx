import { Calendar, Printer, ArrowRight, ArrowLeftRight, PenLine, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { recipes } from '../data/recipes';

const snackOptions = [
  { id: 's1', name: 'Greek Yogurt & Berries', cals: 150, protein: 12, carbs: 15, fats: 3, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop' },
  { id: 's2', name: 'Almonds & Apple', cals: 200, protein: 6, carbs: 25, fats: 14, img: 'https://images.unsplash.com/photo-1568702846914-9609e558653d?q=80&w=800&auto=format&fit=crop' },
  { id: 's3', name: 'Hummus & Carrots', cals: 180, protein: 5, carbs: 20, fats: 9, img: 'https://images.unsplash.com/photo-1549480112-9c17af1baf02?q=80&w=800&auto=format&fit=crop' },
  { id: 's4', name: 'Protein Shake', cals: 130, protein: 25, carbs: 5, fats: 2, img: 'https://images.unsplash.com/photo-1553535919-482f3a61ba26?q=80&w=800&auto=format&fit=crop' },
];

export default function Tracking() {
  const [savedPlan, setSavedPlan] = useState<any>(null);
  const [showSnackModal, setShowSnackModal] = useState(false);
  const [selectedSnacks, setSelectedSnacks] = useState<{[day: number]: any[]}>({});

  useEffect(() => {
    try {
      const planStr = localStorage.getItem('userMealPlan');
      if (planStr) {
        setSavedPlan(JSON.parse(planStr));
      }
      const snacksStr = localStorage.getItem('userSnacks');
      if (snacksStr) {
        setSelectedSnacks(JSON.parse(snacksStr));
      }
    } catch (e) {}
  }, []);

  const [activeDay, setActiveDay] = useState(0);

  const days = [
    { name: 'MON', date: '24 Oct' },
    { name: 'TUE', date: '25 Oct' },
    { name: 'WED', date: '26 Oct' },
    { name: 'THU', date: '27 Oct' },
    { name: 'FRI', date: '28 Oct' },
    { name: 'SAT', date: '29 Oct' },
    { name: 'SUN', date: '30 Oct' },
  ];

  if (!savedPlan) {
    return (
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="max-w-[1280px] mx-auto px-8 py-32 text-center"
      >
        <h1 className="text-display-lg text-[#163810] mb-6 text-5xl font-serif">Create a meal plan to get started</h1>
        <Link to="/meal-planner" className="inline-block bg-[#163810] text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity text-lg tracking-wide">
          Meal Planner
        </Link>
      </motion.main>
    );
  }

  const mealsToDisplay = savedPlan?.days?.[activeDay]?.meals?.map((m: any) => ({
    label: m.label,
    recipe: recipes.find(r => r.id === m.recipeId) || recipes[0]
  })) || [];

  const daySnacks = selectedSnacks[activeDay] || [];

  const dailyCals = mealsToDisplay.reduce((sum: number, meal: any) => sum + parseInt(meal.recipe.cals || '0'), 0) + daySnacks.reduce((sum, s) => sum + s.cals, 0);
  const dailyProtein = mealsToDisplay.reduce((sum: number, meal: any) => sum + parseInt(meal.recipe.protein || '0'), 0) + daySnacks.reduce((sum, s) => sum + s.protein, 0);
  const dailyCarbs = mealsToDisplay.reduce((sum: number, meal: any) => sum + parseInt(meal.recipe.cals || '0') * 0.1, 0) + daySnacks.reduce((sum, s) => sum + s.carbs, 0); // Estimated recipe carbs + real snack carbs
  const dailyFats = mealsToDisplay.reduce((sum: number, meal: any) => sum + parseInt(meal.recipe.cals || '0') * 0.03, 0) + daySnacks.reduce((sum, s) => sum + s.fats, 0); // Estimated recipe fats + real snack fats

  const targetCals = 2000;
  const targetProtein = 150;
  const targetCarbs = 250;
  const targetFats = 65;

  const handleAddSnack = (snack: any) => {
    const newSnacks = {
      ...selectedSnacks,
      [activeDay]: [...(selectedSnacks[activeDay] || []), snack]
    };
    setSelectedSnacks(newSnacks);
    localStorage.setItem('userSnacks', JSON.stringify(newSnacks));
    setShowSnackModal(false);
  };

  const handleRemoveSnack = (index: number) => {
    const daySnacks = selectedSnacks[activeDay] || [];
    const newDaySnacks = [...daySnacks];
    newDaySnacks.splice(index, 1);
    
    const newSnacks = {
      ...selectedSnacks,
      [activeDay]: newDaySnacks
    };
    setSelectedSnacks(newSnacks);
    localStorage.setItem('userSnacks', JSON.stringify(newSnacks));
  };

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-[1280px] mx-auto px-8 py-16"
    >
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-display-lg text-[#163810] mb-4 text-5xl font-serif">Weekly Ritual.</h1>
          <p className="text-on-surface-variant max-w-xl text-lg italic font-serif">
            Curating your nutritional journey for the week of Oct 24th – 30th.<br/>
            Based on your goal for <strong className="text-[#163810]">{savedPlan.goal}</strong>.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-[#E8EAE6] text-[#163810] px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#D5D8D3] transition-colors">
            <Calendar className="w-4 h-4" /> Week View
          </button>
          <button className="flex items-center gap-2 bg-[#163810] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
            <Printer className="w-4 h-4" /> Export Plan
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
          {/* Daily Target Card */}
          <div className="bg-[#F3F4F1] rounded-2xl p-6 shadow-sm border border-[#E8EAE6]">
            <h2 className="text-2xl font-serif text-[#163810] mb-6">Daily Target</h2>
            
            <div className="flex justify-between items-end mb-4">
              <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">Calories</span>
              <span className="text-lg font-bold text-[#163810]">{dailyCals} / {targetCals} kcal</span>
            </div>
            
            <div className="w-full h-1 bg-[#E8EAE6] mb-8 rounded-full overflow-hidden">
               <div className="h-full bg-[#163810]" style={{ width: `${Math.min(100, (dailyCals / targetCals) * 100)}%` }}></div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 border border-[#E8EAE6] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#E57373]"></div>
                  <span className="font-semibold text-sm text-[#163810]">Protein</span>
                </div>
                <span className="text-sm text-on-surface-variant">{dailyProtein}g / {targetProtein}g</span>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-[#E8EAE6] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#81C784]"></div>
                  <span className="font-semibold text-sm text-[#163810]">Fats</span>
                </div>
                <span className="text-sm text-on-surface-variant">{Math.round(dailyFats)}g / {targetFats}g</span>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-[#E8EAE6] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#FFD54F]"></div>
                  <span className="font-semibold text-sm text-[#163810]">Carbs</span>
                </div>
                <span className="text-sm text-on-surface-variant">{Math.round(dailyCarbs)}g / {targetCarbs}g</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Tracking Area */}
        <div className="flex-grow">
          
          {/* Days Tabs */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar mb-8 pb-2">
            {days.map((day, idx) => (
              <button 
                key={day.name}
                onClick={() => setActiveDay(idx)}
                className={`flex flex-col items-center justify-center min-w-[5rem] py-3 rounded-xl border flex-shrink-0 transition-all ${
                  activeDay === idx 
                    ? 'bg-[#163810] text-white border-[#163810] shadow-md' 
                    : 'bg-white text-on-surface-variant border-[#E8EAE6] hover:border-[#163810] hover:text-[#163810]'
                }`}
              >
                <span className="text-xs font-bold mb-1">{day.name}</span>
                <span className={`text-sm ${activeDay === idx ? 'text-white' : 'text-[#163810]'}`}>{day.date}</span>
              </button>
            ))}
          </div>

          {/* Meals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {mealsToDisplay.map((mealInfo: any, idx: number) => {
              const recipe = mealInfo.recipe;
              return (
                <article key={idx} className="bg-[#FCFCFB] border border-[#E8EAE6] rounded-2xl overflow-hidden shadow-sm flex flex-col group relative">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={recipe.img} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold tracking-widest text-[#163810] rounded shadow-sm uppercase">
                      {mealInfo.label}
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#163810] shadow hover:bg-gray-50 transition-colors">
                        <ArrowLeftRight className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#163810] shadow hover:bg-gray-50 transition-colors">
                        <PenLine className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                       <Link to={`/recipe/${recipe.id}`} className="block">
                         <h3 className="text-xl font-serif text-[#163810] hover:opacity-80 transition-opacity pr-2">{recipe.title}</h3>
                       </Link>
                       <Link to={`/recipe/${recipe.id}`} className="mt-1 flex-shrink-0" aria-label={`View ${recipe.title}`}>
                         <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:text-[#163810] transition-colors cursor-pointer" />
                       </Link>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold tracking-wider text-on-surface-variant mb-4 uppercase">
                      <span>{recipe.cals} KCAL</span>
                      <div className="w-1 h-1 rounded-full bg-[#E8EAE6]"></div>
                      <span>{recipe.protein} PROTEIN</span>
                    </div>
                    <p className="text-sm text-on-surface-variant italic leading-relaxed line-clamp-2">
                      {recipe.desc}
                    </p>
                  </div>
                </article>
              );
            })}

            {/* Add Snacks Button */}
            <button 
              onClick={() => setShowSnackModal(true)}
              className="bg-[#F3F4F1] border-2 border-dashed border-[#CFD4C9] rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-[#E8EAE6] transition-colors group min-h-[16rem]"
            >
              <div className="w-12 h-12 rounded-full bg-[#CFD4C9] text-[#163810] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-xl font-serif text-[#163810] mb-2">Add Snacks</span>
              <span className="text-sm text-on-surface-variant italic leading-relaxed">Maintain metabolism with healthy grazings.</span>
            </button>

            {/* Display Added Snacks */}
            {daySnacks.map((snack, idx) => (
              <article key={`snack-${idx}`} className="bg-[#FCFCFB] border border-[#E8EAE6] rounded-2xl overflow-hidden shadow-sm flex flex-col group relative">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={snack.img} 
                    alt={snack.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold tracking-widest text-[#163810] rounded shadow-sm uppercase">
                    SNACK
                  </div>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button 
                      onClick={() => handleRemoveSnack(idx)}
                      className="w-8 h-8 bg-red-50 text-red-600 rounded-full flex items-center justify-center shadow hover:bg-red-100 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-[#163810] mb-2">{snack.name}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold tracking-wider text-on-surface-variant uppercase">
                    <span>{snack.cals} KCAL</span>
                    <div className="w-1 h-1 rounded-full bg-[#E8EAE6]"></div>
                    <span>{snack.protein}g PRO</span>
                    <div className="w-1 h-1 rounded-full bg-[#E8EAE6]"></div>
                    <span>{snack.carbs}g CRB</span>
                    <div className="w-1 h-1 rounded-full bg-[#E8EAE6]"></div>
                    <span>{snack.fats}g FAT</span>
                  </div>
                </div>
              </article>
            ))}

          </div>
        </div>

      </div>

      {/* Snack Selection Modal */}
      <AnimatePresence>
        {showSnackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSnackModal(false)}
              className="absolute inset-0 bg-[#163810]/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 sm:p-8 border-b border-[#E8EAE6] flex justify-between items-start sticky top-0 bg-white z-10">
                <div>
                  <h2 className="text-3xl font-serif text-[#163810] mb-2">Select a Snack</h2>
                  <p className="text-on-surface-variant italic text-sm">Add a healthy grazing option to your log.</p>
                </div>
                <button 
                  onClick={() => setShowSnackModal(false)}
                  className="w-10 h-10 rounded-full bg-[#F3F4F1] text-[#163810] flex items-center justify-center hover:bg-[#E8EAE6] transition-colors"
                >
                   <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {snackOptions.map(snack => (
                    <button 
                      key={snack.id}
                      onClick={() => handleAddSnack(snack)}
                      className="text-left group bg-[#FCFCFB] border border-[#E8EAE6] rounded-2xl overflow-hidden hover:border-[#163810] hover:shadow-md transition-all flex flex-col"
                    >
                       <div className="h-32 w-full overflow-hidden">
                          <img src={snack.img} alt={snack.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       </div>
                       <div className="p-4">
                          <h4 className="font-semibold text-[#163810] mb-2">{snack.name}</h4>
                          <div className="flex flex-wrap gap-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                            <span className="bg-[#F3F4F1] px-2 py-1 rounded">{snack.cals} KCAL</span>
                            <span className="bg-[#F3F4F1] px-2 py-1 rounded">{snack.protein}g PRO</span>
                          </div>
                          <div className="flex flex-wrap gap-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mt-2">
                             <span className="bg-[#F3F4F1] px-2 py-1 rounded">{snack.carbs}g CRB</span>
                             <span className="bg-[#F3F4F1] px-2 py-1 rounded">{snack.fats}g FAT</span>
                          </div>
                       </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.main>
  );
}
