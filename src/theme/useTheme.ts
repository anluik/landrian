import { use } from "react";
import { ThemeContext } from "./context";

export function useTheme() {
    const context = use(ThemeContext);
    if (!context) throw new Error("useTheme requires a ThemeProvider");
    return context;
}
