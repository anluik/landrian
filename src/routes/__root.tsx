import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/nav/Navbar.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";

export const Route = createRootRoute({
    component: RootComponent
});

function RootComponent() {
    return (
        <div className="flex h-dvh flex-col">
            <Navbar />
            <main className="min-h-0 flex-1">
                <Outlet />
            </main>
            <Toaster />
        </div>
    );
}
