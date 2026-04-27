import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Flame, Dumbbell } from 'lucide-react';
import { motion } from 'motion/react';
import { recipes } from '../data/recipes';

export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === Number(id));

  if (!recipe) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-[1280px] mx-auto px-8 py-32 text-center"
      >
        <h2 className="text-display-lg text-primary mb-4">Recipe Not Found</h2>
        <Link to="/" className="text-secondary font-bold hover:text-primary">&larr; Back to Recipes</Link>
      </motion.div>
    );
  }

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="pb-24"
    >
      {/* Hero Header */}
      <header className="bg-surface-container-low pt-12 pb-24">
        <div className="max-w-[1280px] mx-auto px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-primary transition-colors mb-12 font-label-caps text-xs tracking-wider uppercase">
            <ArrowLeft className="w-4 h-4" />
            Back to all recipes
          </Link>
          
          <div className="max-w-4xl">
            <div className={`inline-block px-3 py-1 text-white text-xs font-bold uppercase tracking-wider rounded mb-6 ${recipe.tagColor || 'bg-primary'}`}>
              {recipe.tag}
            </div>
            <h1 className="text-display-lg text-primary mb-6">{recipe.title}</h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              {recipe.desc}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-8 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Image and Details */}
          <div className="lg:col-span-7 space-y-12">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden editorial-shadow bg-white">
              <img 
                src={recipe.img} 
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <section>
              <h2 className="text-headline-md text-3xl text-primary mb-6">Instructions</h2>
              <div className="space-y-8">
                {recipe.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold font-headline select-none">
                      {idx + 1}
                    </div>
                    <p className="text-body-lg text-on-surface-variant leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Stats and Ingredients */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl p-8 editorial-shadow nutritional-label-border space-y-8">
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col items-center p-4 bg-surface-container-low rounded-xl">
                  <Clock className="w-6 h-6 text-primary mb-2" />
                  <span className="text-[10px] text-label-caps text-tertiary">TIME</span>
                  <span className="font-bold text-on-surface">{recipe.time}</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-surface-container-low rounded-xl">
                  <Flame className="w-6 h-6 text-primary mb-2" />
                  <span className="text-[10px] text-label-caps text-tertiary">CALORIES</span>
                  <span className="font-bold text-on-surface">{recipe.cals}</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-surface-container-low rounded-xl">
                  <Dumbbell className="w-6 h-6 text-primary mb-2" />
                  <span className="text-[10px] text-label-caps text-tertiary">PROTEIN</span>
                  <span className="font-bold text-on-surface">{recipe.protein}</span>
                </div>
              </div>

              <div className="pt-8 border-t border-surface-container-high">
                <h3 className="text-headline-md text-2xl text-primary mb-6">Ingredients</h3>
                <ul className="space-y-4">
                  {recipe.ingredients.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-body-md text-on-surface-variant">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </motion.main>
  );
}
