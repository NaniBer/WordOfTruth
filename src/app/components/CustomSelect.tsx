"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ThemeConfig } from "../constants/themes";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  t: ThemeConfig;
  minWidth?: string;
}

export function CustomSelect({
  value,
  options,
  onChange,
  t,
  minWidth = "60px",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${t.bgTertiary} ${t.text} text-xs rounded-lg px-2 py-1.5 border-none outline-none backdrop-blur-sm cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1`}
        style={{ minWidth }}
      >
        <span>{selectedOption?.label}</span>
        <ChevronDown
          className={`w-3 h-3 ${t.textSecondary} transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full right-0 mt-1 ${t.surface} rounded-lg shadow-lg overflow-hidden z-50 min-w-full`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs ${t.text} hover:${t.bgTertiary} transition-colors ${
                option.value === value ? t.bgTertiary : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
