"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full border border-white/25 bg-black/20 backdrop-blur-md" />
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/10"
      aria-label="Toggle theme"
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 180,
          scale: 1,
        }}
        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        className="relative"
      >
        {isDark ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </motion.div>

      {/* Glow effect */}
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: isDark
            ? "0 0 20px rgba(255,255,255,0.1)"
            : "0 0 20px rgba(247,247,0,0.2)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};