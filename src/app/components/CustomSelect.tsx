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
        className={`${t.bgSecondary} ${t.text} text-xs rounded-lg pl-3 pr-2 py-2 border ${t.border} cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-between gap-2`}
        style={{ minWidth }}
      >
        <span className="font-medium whitespace-nowrap">{selectedOption?.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 ${t.textSecondary} transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full right-0 mt-1.5 ${t.bgSecondary} border ${t.border} rounded-lg shadow-xl overflow-hidden z-[60] min-w-[120px] `}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-xs ${t.text} hover:${t.navActive} transition-colors ${
                option.value === value ? t.navActive : ""
              } ${index !== options.length - 1 ? `border-b ${t.border}` : ""}`}
            >
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
