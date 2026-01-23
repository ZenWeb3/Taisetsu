import Link from "next/link";
import { Navbar } from "@/components";
import { Star } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col">
      <Navbar />=
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="relative mb-12">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-zinc-600"
          >
            <rect x="70" y="170" width="60" height="20" fill="currentColor" />

            <rect x="90" y="60" width="20" height="110" fill="currentColor" />

            <rect
              x="82"
              y="50"
              width="36"
              height="25"
              rx="2"
              fill="currentColor"
            />
            <rect x="86" y="54" width="10" height="8" rx="1" fill="#09090b" />

            <rect x="40" y="45" width="120" height="8" fill="currentColor" />

            <rect x="40" y="53" width="25" height="15" fill="currentColor" />

            <line
              x1="140"
              y1="53"
              x2="140"
              y2="120"
              stroke="currentColor"
              strokeWidth="2"
              className="animate-pulse"
            />

            <path
              d="M135 120 L145 120 L145 130 Q145 138 140 138 Q135 138 135 130 Z"
              fill="currentColor"
              className="animate-bounce"
              style={{ animationDuration: "2s" }}
            />

            <rect x="135" y="45" width="10" height="8" fill="#3f3f46" />
          </svg>

          <div className="absolute -bottom-2 -right-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              className="animate-spin"
              style={{ animationDuration: "4s" }}
            >
              <path
                d="M20 8 L22 2 L18 2 Z M20 32 L22 38 L18 38 Z M8 20 L2 22 L2 18 Z M32 20 L38 22 L38 18 Z M11 11 L6 6 L9 9 Z M29 29 L34 34 L31 31 Z M29 11 L34 6 L31 9 Z M11 29 L6 34 L9 31 Z"
                fill="#3f3f46"
              />
              <circle cx="20" cy="20" r="8" fill="#27272a" />
              <circle cx="20" cy="20" r="4" fill="#3f3f46" />
            </svg>
          </div>

          <div className="absolute -bottom-4 -left-6">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              className="animate-spin"
              style={{ animationDuration: "3s", animationDirection: "reverse" }}
            >
              <path
                d="M15 5 L16.5 1 L13.5 1 Z M15 25 L16.5 29 L13.5 29 Z M5 15 L1 16.5 L1 13.5 Z M25 15 L29 16.5 L29 13.5 Z"
                fill="#3f3f46"
              />
              <circle cx="15" cy="15" r="6" fill="#27272a" />
              <circle cx="15" cy="15" r="3" fill="#3f3f46" />
            </svg>
          </div>
        </div>

        <div className="text-center max-w-md">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Under Construction
          </h1>
          <p className="text-zinc-500 text-lg mb-8">
            We&apos;re building something awesome. Documentation is coming soon.
          </p>

          <div className="w-full max-w-xs mx-auto mb-8">
            <div className="flex justify-between text-xs text-zinc-600 mb-2">
              <span>Progress</span>
              <span>57%</span>
            </div>
            <div className="h-2 bg-[#27272a] rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-zinc-600 to-zinc-400 rounded-full transition-all duration-1000"
                style={{ width: "57%" }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="https://github.com/zenweb3/taisetsu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-md text-sm font-semibold border hover:bg-[#1a1a1f] text-zinc-300   border-[#27272a]   transition-all flex items-center justify-center gap-2"
            >
              <Star className="text-amber-600" />
              Star on GitHub
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-md text-sm font-semibold hover:bg-zinc-200 text-[#09090b] bg-white  border  hover:border-[#3f3f46] transition-all"
            >
              Back Home
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 opacity-20">
          <div className="w-20 h-20 border-2 border-dashed border-zinc-700 rounded-lg" />
        </div>
        <div className="absolute top-32 right-16 opacity-20">
          <div className="w-12 h-12 border-2 border-dashed border-zinc-700 rounded" />
        </div>
        <div className="absolute bottom-32 right-24 opacity-20">
          <div className="w-8 h-8 border-2 border-dashed border-zinc-700 rotate-45" />
        </div>
      </main>
      <footer className="px-6 lg:px-16 py-6 border-t border-[#27272a] text-center">
        <p className="text-zinc-700 text-sm">
          Want to contribute?{" "}
          <Link
            href="https://github.com/zenweb3/taisetsu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors underline"
          >
            Check out the repo
          </Link>
        </p>
      </footer>
    </div>
  );
}
