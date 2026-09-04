import { Board } from "@/components/board/Board";
import { Navbar } from "@/components/nav/Navbar";
import { Toaster } from "@/components/ui/sonner.tsx";

export default function App() {
    return (
        <div className="flex h-dvh flex-col">
            <Navbar />
            <main className="min-h-0 flex-1">
                <Board />
            </main>
            <Toaster />
        </div>
    );
}
