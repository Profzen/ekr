"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { clsx } from "clsx";

const navLinks = [
  { name: "Accueil", path: "/" },
  { name: "Présentation", path: "/presentation" },
  { name: "Articles", path: "/articles" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const useLightHeader = isScrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActiveLink = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  return (
    <>
      {/* Mobile Navbar - Simple, always visible on top */}
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="EKR Africa Agrovision Group"
              className="h-10 w-20 rounded-2xl object-contain"
            />
          </Link>

          <button
            className="p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Menu mobile"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border-t border-gray-100 shadow-xl p-4 flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={clsx(
                    "text-base font-medium py-2 border-b border-gray-50",
                    isActiveLink(link.path) ? "text-primary" : "text-gray-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/presentation#contact"
                className="w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
              >
                <Phone size={18} />
                Nous contacter
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Desktop Header - Fixed, with transparency on home */}
      <header
        className={clsx(
          "hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          useLightHeader ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1500px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="EKR Africa Agrovision Group"
              className="h-16 w-32 rounded-2xl object-contain scale-[2]"
            />
          </Link>

          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-accent",
                  useLightHeader ? "text-foreground" : "text-white/90",
                  isActiveLink(link.path) && "text-accent"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/presentation#contact"
              className={clsx(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                useLightHeader
                  ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                  : "bg-white text-primary hover:bg-white/90 shadow-lg"
              )}
            >
              <Phone size={16} />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
