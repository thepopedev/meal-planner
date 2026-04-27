import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#E8F0E5] py-20 mt-20">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center px-8">
        <div className="mb-12 md:mb-0 text-center md:text-left">
          <Link to="/" className="text-lg font-bold text-primary font-[Noto_Serif] mb-4 block">Nourish</Link>
          <p className="font-body text-stone-600 max-w-xs leading-relaxed text-sm">Dedicated to the intersection of culinary art and nutritional science.</p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-8">
          <div className="flex gap-8">
            <Link to="/" className="text-label-caps uppercase tracking-widest text-stone-500 hover:text-primary transition-colors">Science</Link>
            <Link to="/" className="text-label-caps uppercase tracking-widest text-stone-500 hover:text-primary transition-colors">About</Link>
            <Link to="/" className="text-label-caps uppercase tracking-widest text-stone-500 hover:text-primary transition-colors">Privacy</Link>
            <Link to="/" className="text-label-caps uppercase tracking-widest text-stone-500 hover:text-primary transition-colors">Contact</Link>
          </div>
          <p className="text-label-caps font-normal text-[0.65rem] uppercase tracking-widest text-stone-500">© 2024 Nourish. Modern Organic Nutrition.</p>
        </div>
      </div>
    </footer>
  );
}
