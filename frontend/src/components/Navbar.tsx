"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Menu, X, Github, Twitter } from "lucide-react";
import { SiDiscord } from "@icons-pack/react-simple-icons";

const navLinks = [
  { name: "Features", href: "/#features" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Docs", href: "/docs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: any) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#09090b]/95 backdrop-blur-xl border-b border-[#27272a] shadow-lg shadow-black/20"
            : "bg-[#09090b]/80 backdrop-blur-xl border-b border-[#27272a]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="font-bold text-lg sm:text-xl tracking-tight hover:opacity-80 transition-opacity z-50"
            >
              Taisetsu
            </Link>

            <ul className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((item) => (
                <li key={item.name}>
                  {item.href.startsWith("/") ? (
                    <Link
                      href={item.href}
                      className="text-zinc-400 text-sm font-medium hover:text-white transition-colors relative group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-zinc-400 text-sm font-medium hover:text-white transition-colors relative group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://github.com/zenweb3/taisetsu"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-md text-sm font-semibold text-zinc-300 border border-[#27272a] hover:bg-[#1a1a1f] hover:border-[#3f3f46] hover:text-white transition-all flex items-center gap-2"
              >
                <Star className="w-4 h-4 text-amber-500" />
                <span className="hidden xl:inline">Star on GitHub</span>
                <span className="xl:hidden">Star</span>
              </a>

              <a
                href="#how-it-works"
                className="px-4 py-2.5 rounded-md text-sm font-semibold bg-white text-[#09090b] hover:bg-zinc-200 transition-all"
              >
                Get Started
              </a>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 -mr-2 rounded-md hover:bg-[#1a1a1f] transition-colors z-50"
              aria-label="Toggle menu"
            >
              {open ? (
                <X className="w-5 h-5 text-zinc-300" />
              ) : (
                <Menu className="w-5 h-5 text-zinc-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          open ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 w-full sm:w-80 h-full bg-[#09090b] border-l border-[#27272a] transform transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-6">
            <div className="flex-1">
              <ul className="space-y-1">
                {navLinks.map((item, index) => (
                  <li
                    key={item.name}
                    className={`transform transition-all duration-300 ${
                      open
                        ? "translate-x-0 opacity-100"
                        : "translate-x-8 opacity-0"
                    }`}
                    style={{
                      transitionDelay: open ? `${index * 50 + 100}ms` : "0ms",
                    }}
                  >
                    {item.href.startsWith("/") ? (
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block py-3 px-4 text-lg font-medium text-zinc-300 hover:text-white hover:bg-[#1a1a1f] rounded-lg transition-all"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block py-3 px-4 text-lg font-medium text-zinc-300 hover:text-white hover:bg-[#1a1a1f] rounded-lg transition-all"
                      >
                        {item.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`space-y-3 pt-6 border-t border-[#27272a] transform transition-all duration-300 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: open ? "300ms" : "0ms" }}
            >
              <a
                href="https://github.com/zenweb3/taisetsu"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-semibold text-zinc-300 border border-[#27272a] hover:bg-[#1a1a1f] hover:border-[#3f3f46] transition-all"
              >
                <Star className="w-4 h-4 text-amber-500" />
                Star on GitHub
              </a>

              <a
                href="#how-it-works"
                onClick={() => setOpen(false)}
                className="block w-full px-4 py-3 rounded-lg text-sm font-semibold bg-white text-[#09090b] text-center hover:bg-zinc-200 transition-all"
              >
                Get Started
              </a>
            </div>

            <div
              className={`pt-6 flex items-center justify-center gap-6 transform transition-all duration-300 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: open ? "400ms" : "0ms" }}
            >
              <a
                href="https://twitter.com/zenonchain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://discord.gg/zenfiweb3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
                aria-label="Discord"
              >
                <SiDiscord className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/zenweb3/taisetsu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
