import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ColorContextType {
  hue: number;
  setHue: (hue: number) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: ReactNode }) {
  const [hue, setHueState] = useState<number>(0);

  useEffect(() => {
    const savedHue = localStorage.getItem("primaryHue");
    if (savedHue) {
      const parsedHue = parseInt(savedHue, 10);
      setHueState(parsedHue);
      applyColor(parsedHue);
    } else {
      applyColor(0);
    }
  }, []);

  const applyColor = (newHue: number) => {
    const root = document.documentElement;
    
    root.style.setProperty("--primary", `${newHue} 100% 52%`);
    root.style.setProperty("--destructive", `${newHue} 100% 52%`);
    root.style.setProperty("--chart-1", `${newHue} 100% 52%`);
  };

  const handleHueChange = (newHue: number) => {
    setHueState(newHue);
    localStorage.setItem("primaryHue", newHue.toString());
    applyColor(newHue);
  };

  return (
    <ColorContext.Provider value={{ hue, setHue: handleHueChange }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}
