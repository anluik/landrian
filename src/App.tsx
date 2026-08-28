import { Board } from "./board/Board";
import { Navbar } from "./nav/Navbar";

export default function App() {
    return (
        <div className="flex h-dvh flex-col">
            <Navbar />
            <main className="min-h-0 flex-1">
                <Board />
            </main>
        </div>
    );
}
