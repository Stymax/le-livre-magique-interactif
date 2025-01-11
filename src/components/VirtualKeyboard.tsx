import { useState } from "react";

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
}

export default function VirtualKeyboard({ onKeyPress }: VirtualKeyboardProps) {
  const [isUpperCase, setIsUpperCase] = useState(false);

  const keys = [
    ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"],
    ["⇧", "w", "x", "c", "v", "b", "n", "⌫"],
    ["123", "espace", "✓"]
  ];

  const handleKeyPress = (key: string) => {
    if (key === "⇧") {
      setIsUpperCase(!isUpperCase);
      return;
    }
    if (key === "espace") {
      onKeyPress(" ");
      return;
    }
    onKeyPress(isUpperCase ? key.toUpperCase() : key);
  };

  return (
    <div className="grid gap-1">
      {keys.map((row, i) => (
        <div key={i} className="flex justify-center gap-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className={`
                ${key === "espace" ? "px-8" : "px-3"} 
                ${key === "⌫" || key === "⇧" || key === "✓" ? "px-4" : ""} 
                py-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors
                ${isUpperCase && key === "⇧" ? "bg-gray-700" : ""}
              `}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}