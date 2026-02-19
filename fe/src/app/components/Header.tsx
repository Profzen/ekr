import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Présentation', path: '/presentation' },
    { name: 'Articles', path: '/articles' },
  ];

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center transition-colors", isScrolled ? "bg-primary text-white" : "bg-white/10 text-white backdrop-blur-sm")}>
            <span className="font-bold text-xl">E</span>
          </div>
          <div className="flex flex-col">
            <span className={clsx("font-bold leading-tight", isScrolled ? "text-primary" : "text-white")}>
              EKR Africa
            </span>
            <span className={clsx("text-xs tracking-wider", isScrolled ? "text-secondary" : "text-white/80")}>
              AGROVISION GROUP
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                clsx(
                  'text-sm font-medium transition-colors hover:text-accent',
                  isScrolled ? 'text-foreground' : 'text-white/90',
                  isActive && 'text-accent'
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/presentation" // Assuming contact is in presentation page
            className={clsx(
              "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
              isScrolled 
                ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20" 
                : "bg-white text-primary hover:bg-white/90 shadow-lg"
            )}
          >
            <Phone size={16} />
            <span>Contact</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-current"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-foreground' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-foreground' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl p-4 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  clsx(
                    'text-base font-medium py-2 border-b border-gray-50',
                    isActive ? 'text-primary' : 'text-gray-600'
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/presentation"
              className="w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
            >
              <Phone size={18} />
              Nous contacter
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
