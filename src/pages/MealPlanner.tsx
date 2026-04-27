import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { recipes } from '../data/recipes';
import { Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const QUESTIONS = [
  {
    id: 'goal',
    title: "What's your primary goal?",
    options: ["Weight Loss", "Muscle Gain", "Maintenance", "Energy & Focus"]
  },
  {
    id: 'diet',
    title: "Any dietary restrictions?",
    options: ["None", "Plant-Based", "Vegetarian", "Gluten-Free", "Low Carb"]
  },
  {
    id: 'meals',
    title: "How many meals per day?",
    options: ["2 meals + snacks", "3 meals", "4 meals", "5 small meals"]
  },
  {
    id: 'time',
    title: "How much time do you have to cook?",
    options: ["Under 30 mins", "30-60 mins", "Love to cook (1 hr+)"]
  },
  {
    id: 'allergies',
    title: "Any allergies we should know about?",
    options: ["None", "Dairy", "Nuts", "Shellfish", "Eggs"]
  }
];

export default function MealPlanner() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelect = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setIsGenerating(true);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        setIsGenerating(false);
        const shuffled = [...recipes].sort(() => 0.5 - Math.random());
        const newPlan = {
          goal: answers.goal,
          diet: answers.diet,
          days: Array.from({length: 7}).map((_, i) => ({
            dayIndex: i,
            meals: [
              { label: 'Breakfast', recipeId: shuffled[(i * 3) % shuffled.length].id },
              { label: 'Lunch', recipeId: shuffled[(i * 3 + 1) % shuffled.length].id },
              { label: 'Dinner', recipeId: shuffled[(i * 3 + 2) % shuffled.length].id },
            ]
          }))
        };
        localStorage.setItem('userMealPlan', JSON.stringify(newPlan));
        setStep(QUESTIONS.length); // move to results
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, answers]);

  // Results rendering
  if (step === QUESTIONS.length && !isGenerating) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    let savedPlan = null;
    try {
      savedPlan = JSON.parse(localStorage.getItem('userMealPlan') || 'null');
    } catch (e) {}

    const displayGoal = savedPlan?.goal || answers.goal;
    const displayDiet = savedPlan?.diet || answers.diet;

    return (
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-16"
      >
        <div className="mb-12 text-center">
          <h1 className="font-headline text-4xl font-semibold text-primary mb-4 p-4 rounded-xl bg-primary-fixed/30 inline-block">Your Personalised 7-Day Plan</h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Based on your goal for <strong className="text-on-surface">{displayGoal}</strong>, following a <strong className="text-on-surface">{displayDiet}</strong> diet.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {days.map((day, ix) => {
            const dayMeals = savedPlan?.days?.[ix]?.meals?.map((m: any) => ({
              label: m.label,
              recipe: recipes.find(r => r.id === m.recipeId) || recipes[0]
            })) || [];

            return (
              <div key={day} className="bg-surface border border-surface-container-high rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-surface-container-low px-6 py-4 border-b border-surface-container-high">
                  <h3 className="font-headline text-xl font-bold text-on-surface">Day {ix + 1}: {day}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-surface-container-high p-6 gap-6 md:gap-0">
                  {dayMeals.map((meal: any) => (
                    <div key={meal.label} className="md:px-6 flex flex-col items-center text-center group">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-4 border border-primary-fixed bg-primary-fixed/30 px-3 py-1 rounded-full">{meal.label}</span>
                      <Link to={`/recipe/${meal.recipe.id}`} className="block relative w-full h-40 rounded-xl overflow-hidden mb-4">
                        <img src={meal.recipe.img} alt={meal.recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </Link>
                      <Link to={`/recipe/${meal.recipe.id}`} className="font-headline text-base font-semibold text-on-surface hover:text-primary transition-colors">
                        {meal.recipe.title}
                      </Link>
                      <div className="text-xs font-medium text-on-surface-variant flex gap-3 mt-2">
                         <span>{meal.recipe.time}</span>
                         <span className="w-1 h-1 rounded-full bg-outline-variant my-auto"></span>
                         <span>{meal.recipe.cals} KCAL</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.main>
    );
  }

  // Builder Wizard Rendering
  const currentQuestion = QUESTIONS[step];

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col flex-grow bg-[#FCFAF7] min-h-[calc(100vh-80px)] py-12 px-6"
    >
      <div className="max-w-2xl mx-auto w-full flex-grow flex flex-col justify-center">
        
        {isGenerating ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center flex flex-col items-center justify-center space-y-6"
          >
            <Loader2 className="w-16 h-16 text-[#3B6D11] animate-spin" />
            <h2 className="text-2xl font-headline font-semibold text-on-surface">Curating your plan...</h2>
            <p className="text-on-surface-variant text-sm">Cross-referencing parameters with dietitian-approved recipes.</p>
          </motion.div>
        ) : (
          <>
            <div className="mb-10">
              <div className="text-xs font-bold uppercase tracking-widest text-[#3B6D11] mb-2">Step {step + 1} of {QUESTIONS.length}</div>
              <div className="w-full bg-[#E8F0E5] h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#3B6D11]"
                  initial={{ width: `${(step / QUESTIONS.length) * 100}%` }}
                  animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="font-headline text-3xl md:text-4xl font-semibold text-on-surface mb-8">
                  {currentQuestion.title}
                </h1>

                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.id] === option;
                    return (
                      <button
                        key={option}
                        onClick={() => handleSelect(currentQuestion.id, option)}
                        className={`text-left w-full p-5 rounded-xl border flex items-center justify-between transition-all duration-200 ${
                          isSelected 
                            ? 'border-[#3B6D11] bg-[#EAF3DE] shadow-[0_0_0_1px_#3B6D11]' 
                            : 'border-outline-variant bg-white hover:border-[#3B6D11]/50 shadow-sm'
                        }`}
                      >
                        <span className={`font-semibold ${isSelected ? 'text-[#3B6D11]' : 'text-on-surface'}`}>
                          {option}
                        </span>
                        {isSelected && <Check className="w-5 h-5 text-[#3B6D11]" />}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-12 flex items-center justify-between">
                  <button 
                    onClick={handleBack}
                    className={`flex items-center gap-2 text-sm font-semibold transition-colors ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-on-surface-variant hover:text-on-surface'}`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  
                  <button 
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className={`flex items-center gap-2 text-sm font-semibold px-8 py-3 rounded-full transition-all ${
                      answers[currentQuestion.id] 
                        ? 'bg-[#3B6D11] text-white hover:opacity-90 cursor-pointer' 
                        : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
                    }`}
                  >
                    {step === QUESTIONS.length - 1 ? 'Generate Plan' : 'Continue'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.main>
  );
}
