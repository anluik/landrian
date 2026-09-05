import "./index.css";
import { StrictMode } from "react";
import { ThemeProvider } from "./theme/ThemeProvider.tsx";
import { loadIssues } from "./store/store.ts";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

void loadIssues();

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </StrictMode>
    );
}
