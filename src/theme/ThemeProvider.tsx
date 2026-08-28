import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./context";

const STORAGE_KEY = "landrian-theme";

const loadTheme = (): Theme => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" || stored === "system"
        ? stored
        : "system";
};

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(loadTheme);

    useEffect(() => {
        const root = document.documentElement;
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const apply = () => {
            root.classList.toggle(
                "dark",
                theme === "dark" || (theme === "system" && media.matches)
            );
        };
        apply();
        if (theme !== "system") return;
        media.addEventListener("change", apply);
        return () => media.removeEventListener("change", apply);
    }, [theme]);

    const setTheme = (next: Theme) => {
        localStorage.setItem(STORAGE_KEY, next);
        setThemeState(next);
    };

    return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}
