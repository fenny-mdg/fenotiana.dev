import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light" | null;

const useTheme: () => [Theme, Dispatch<SetStateAction<Theme>>] = () => {
  const [theme, setTheme] = useState<Theme>(null);

  useEffect(() => {
    const currentTheme: Theme = theme || localStorage.theme || "light";
    if (
      currentTheme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add(currentTheme || "dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.theme = currentTheme;
    setTheme(currentTheme);
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
