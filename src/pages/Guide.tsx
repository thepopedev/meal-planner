import { ArrowRight, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Guide() {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="pt-12"
    >
      {/* Article Header */}
      <article className="max-w-[1280px] mx-auto px-8">
        <header className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary-container mb-8">
            <BadgeCheck className="w-4 h-4" />
            <span className="text-label-caps text-xs">Written by Registered Dietitian</span>
          </div>
          
          <h1 className="text-display-lg text-primary mb-8 px-4">The Molecular Magic of Micro-Nutrients</h1>
          
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Beyond calories and macros lies a sophisticated symphony of micronutrients. Discover how trace minerals and vitamins orchestrate your cellular longevity.
          </p>
          
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrzTT1wrClB_7i2lLg3rJ7zv_JpYS9D9DObde_jDOnfvSTsn4vIZANumoIO7caaJfBl6eJRknFTPVlRuEvN_hXIzvaeyNAvjpfrhFnq4M53IOmnlEOVNKYyV-5jBY4cBudtltncR2qZuwJbwpSsbEQ6blrbD4bY8nKx-72w7d8JdUVmqnOUq3XP53LV4lpqGb_C8tD_u6GOK2ZO9e76-nwcHRdNVBjl5JAT6RJcydigIXbVnNbVFOlYkYPgEP9u-nRF7V-W2K4SmM" 
                alt="Dr. Elena Thorne" 
              />
            </div>
            <div className="text-left">
              <p className="font-bold text-on-background">Dr. Elena Thorne, RD</p>
              <p className="text-xs text-stone-500 text-label-caps mt-0.5">Published Oct 14, 2024 • 12 min read</p>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <figure className="mb-32 max-w-5xl mx-auto">
          <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden editorial-shadow">
            <img 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2070" 
              alt="Fresh vegetables" 
            />
          </div>
          <figcaption className="mt-4 text-sm text-stone-500 italic text-center">
            Photography by Julian Marc. Sourcing the highest quality seasonal produce is the first step in micronutrient density.
          </figcaption>
        </figure>

        {/* Article Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-start">
          
          {/* Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32">
            <div className="space-y-8 tracking-wide">
              <div>
                <h4 className="text-label-caps text-stone-400 mb-4">TABLE OF CONTENTS</h4>
                <ul className="space-y-3">
                  <li><a href="#intro" className="text-primary font-bold text-sm">Understanding Density</a></li>
                  <li><a href="#absorption" className="text-stone-500 hover:text-primary transition-colors text-sm">Bioavailability Factors</a></li>
                  <li><a href="#essential" className="text-stone-500 hover:text-primary transition-colors text-sm">The Essential Ten</a></li>
                  <li><a href="#visuals" className="text-stone-500 hover:text-primary transition-colors text-sm">Visualizing Nutrients</a></li>
                </ul>
              </div>
              
              <div className="p-6 bg-surface-container-low rounded-xl">
                <h4 className="text-headline-md text-lg mb-2">Weekly Newsletter</h4>
                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed font-body">Science-backed nutrition tips delivered every Tuesday.</p>
                <button className="w-full bg-primary text-white py-2 rounded-lg text-xs font-bold font-body hover:opacity-90 transition-opacity">
                  Join 50k+ Readers
                </button>
              </div>
            </div>
          </aside>

          {/* Long-form Text */}
          <section className="lg:col-span-9 text-body-lg text-on-surface-variant leading-[1.8] space-y-12 pb-16">
            <p id="intro">
              In the contemporary landscape of nutrition, we often fixate on the "Big Three"—proteins, carbohydrates, and fats. While these provide the fuel for our daily activities, the intricate biological processes that sustain life are governed by a far more subtle cast of characters: micronutrients. These trace elements, required in minuscule amounts, serve as the essential catalysts for every enzymatic reaction in the human body.
            </p>
            
            <h2 id="absorption" className="text-headline-md text-3xl text-primary mt-16">The Bioavailability Paradox</h2>
            <p>
              Eating nutrient-dense food is only half the battle. Bioavailability—the degree to which a nutrient is absorbed and utilized—varies wildly based on food pairings. For instance, the non-heme iron found in spinach requires the presence of Vitamin C to be effectively cleaved and absorbed into the bloodstream. 
            </p>

            {/* Data Visualization */}
            <div id="visuals" className="nutritional-label-border rounded-2xl p-8 bg-white editorial-shadow my-12 font-body">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-headline-md text-2xl text-primary">Micronutrient Density Index</h3>
                <span className="px-3 py-1 bg-tertiary-fixed text-tertiary text-label-caps rounded">NUTRITION SCIENCE UNIT</span>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    name: "Dark Leafy Greens",
                    score: 98,
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLSv7vE7SzaaUN_K1rcAGzhjLel0cv0egyoAsyxdweFBhg970FILwVMnpa8UYwQWHoT_3Hv3cLYahsN-3ujmnTuBAR2iUqgboNvnGrFQpg10079Hk2720OVotC9DJiobQIe2t6CMZuTbg1eb_KTTxK8CUeNd42HccgoQW3Q8312IGi2Bb8PvwmFK2CIM1pWRMON6l46Ea0lvw13To_zIacD8ppJqXXvGaWvXI5bd1GGTRjYD7QZQ2iCmvMyjsUPJCGQVIGAIoo77k"
                  },
                  {
                    name: "Wild Berries",
                    score: 84,
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoBzidgLn2ZGfxYvq205X36UqZn3ZTV1vkY2gb_DYD9RXHoEscyM2_MF0z6xIbQ-aLpKX0KTfp5AS_vi2i0CVrnU2X0d4NU0vaSe6vZRlI7f4oWbUie1w8pJyX_Pv9v9gm41JyyVrnoBrM6yN7c4HQ8_qCspmvY3hJYk_2Idbzomx_vXVzZzN3vN_uO16e7JDBv9r829hCWaI-Jxk9Wkc4TAVViHKdp1t0Sfdkk07r2muJ4PHxxtN01TJHNpSR30aTegQkVTvKEb8"
                  },
                  {
                    name: "Cold Water Fish",
                    score: 76,
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZJHPkcXYiArv9Ss9M3qSdltoAIrFbVSiJLlK8N605KGMBPSTZSKIJ7ysjYcU_DLtVueuj4JYnuOTG2AB12AnAxyD-SaFaL3uTN6afCJq0DFL2BL3mnrtTvlwR-31YGjpk70Ho5Lk8CndN9hQalwb3hJDsNWMeiNX-n6RpUa5TaMz2_zdpbUcfIOT2nb0BZe7CFroCzcSRMtGT7zJ5nJ6js0ny8QcNKUS9Nr7e8utS-84ih-_mW5JsVnP-oU1fI3wzhO3TtsgljyU"
                  }
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img className="w-full h-full object-cover" src={item.img} alt={item.name} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-end mb-1">
                        <span className="font-bold text-on-background">{item.name}</span>
                        <span className="text-primary font-bold">{item.score}/100</span>
                      </div>
                      <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary-container h-full" 
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h2 id="essential" className="text-headline-md text-3xl text-primary mt-16">Synergistic Eating</h2>
            <p>
              By understanding these interactions, we can design plates that maximize physiological benefit. Consider the pairing of healthy fats with fat-soluble vitamins (A, D, E, and K). A salad of kale and carrots is far more effective when dressed with high-quality olive oil, as the lipids facilitate the transport of carotenoids across the intestinal wall.
            </p>

            {/* Quote Block */}
            <blockquote className="border-l-4 border-primary pl-8 my-16 py-4 italic text-2xl text-headline-md text-on-background">
              "The goal of modern nutrition isn't just the absence of disease, but the optimization of cellular function."
            </blockquote>

            <p>
              In our research at Nourish, we've identified the "Essential Ten" micronutrients that most modern diets lack. These include Magnesium, Vitamin D3, and various Omega-3 fatty acids. By focusing on whole-food sources—what we call "Biological Packages"—rather than isolated supplements, we ensure that the co-factors necessary for absorption are present.
            </p>
          </section>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-headline-md text-4xl text-primary">Keep Exploring</h3>
              <p className="text-on-surface-variant text-body-md mt-2">Deepen your understanding of modern organic nutrition.</p>
            </div>
            <Link to="/" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All Guides
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                tag: "GUT HEALTH",
                title: "Prebiotics: Feeding the Microbiome Symphony",
                desc: "How fiber-rich foods create a thriving environment for your internal ecosystem.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfy3foY1ugybzj5TsQnvGrRMQ_PttPYcfwjHAedng0GcbMREBznS1oG-DaYEa37IN4t0Rd-Op-CpVVaah55B07Yi25PIrqb1ujDDkjHh0V6wRPa9aESA1iKQwTZ_06mTPlw5ZsXFp3gZpEnwg8MKaBfohLinkq3sTtexDC13x3DAiTWyJmCmU49AuCICMMQ6LqcA0h7pk6kMfnNVPRr_uVwzcWoEuktiPoG1yZ9LD5M2kchdReNZga2KdgBVJy5QH9asyw-R7atDs"
              },
              {
                tag: "METABOLISM",
                title: "The Circadian Rhythm of Digestion",
                desc: "Timing your meals to align with your body's natural metabolic clock.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmw7ylhj2h_di8jp7hyyczCcnXhsAl8VLm_nJn3ZhhStgS9Y6boLp6iGMCl56DYDbhzWPhLdyRGXlrXq5ddHoo_TAnkKiWTgYCjjQFkSO9JwNyuG8VQvksUuUbtImXW0BuGiwLOLmItN9C59f7dKMmUtP8_OsMzKDzMgaZBglecGp7-yp4g4iS2TT7DnCDM2EABO6xL9rU2DuSavveZCAKu7Dyk2cHkNvtodiDY-7jDdRQsfb9NKXMFEX8CHFky0Jv8oSeiKI3Wu4"
              },
              {
                tag: "LONGEVITY",
                title: "Anti-Inflammatory Kitchen Essentials",
                desc: "Spices and herbs that act as nature's most potent biological modifiers.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHMZKKETI0V3BAJp_dD8tf_FROrA95I8WlNORFJR_B2ZrSI2PHZHjcZrZ0X-QrX5qB2xSlo6cfWnBqa4qWZ-3SadK1DJhUPBTkJQ9YqIfv0p_X3qy32u9oKzgZcPlvayCacqjuX8jpq5_MhnlwmNH88GZFD5v1ywm5inwSPvzpuCdfNrERoxV3fJiXUm42fGGuogEDftzsd3ai51WP_hsLRacFwO76khygQZQkct3dfDh6pDDfZ9tBdndLImrBFhajjNaxNq2kdJI"
              }
            ].map((item) => (
              <div key={item.title} className="group cursor-pointer">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 editorial-shadow transition-transform group-hover:-translate-y-2 duration-300">
                  <img className="w-full h-full object-cover" src={item.img} alt={item.title} />
                </div>
                <div className="space-y-3">
                  <span className="text-label-caps text-primary uppercase">{item.tag}</span>
                  <h4 className="text-headline-md text-2xl group-hover:text-primary transition-colors leading-tight">{item.title}</h4>
                  <p className="text-sm text-stone-500 line-clamp-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
