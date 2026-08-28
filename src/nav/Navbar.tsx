import { useEffect, useState } from "react";
import { AvatarButton } from "./AvatarButton";
import { CreateButton } from "./CreateButton";
import { Logo } from "./Logo";
import { SearchBox } from "./SearchBox";
import { SideMenu } from "./SideMenu";

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const breakpoint = window.matchMedia("(min-width: 48rem)");
        const close = () => setMenuOpen(false);
        breakpoint.addEventListener("change", close);
        return () => breakpoint.removeEventListener("change", close);
    }, []);

    return (
        <>
            <header className="grid h-14 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-line px-4">
                <div className="flex items-center justify-self-start">
                    <button
                        type="button"
                        aria-label="Open menu"
                        aria-haspopup="dialog"
                        onClick={() => setMenuOpen(true)}
                        className="grid size-8 place-items-center rounded-md text-muted hover:bg-surface hover:text-ink md:hidden"
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="size-5"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="hidden md:block">
                        <Logo />
                    </div>
                </div>

                <div className="md:hidden">
                    <Logo />
                </div>
                <div className="hidden items-center gap-2 md:flex">
                    <div className="w-72">
                        <SearchBox />
                    </div>
                    <CreateButton />
                </div>

                <div className="justify-self-end">
                    <AvatarButton />
                </div>
            </header>

            <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
}
