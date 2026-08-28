import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AvatarButton } from "./AvatarButton";
import { CreateButton } from "./CreateButton";
import { Logo } from "./Logo";
import { ModeToggle } from "./ModeToggle";
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
            <header className="grid h-14 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-4 border-b px-4">
                <div className="flex items-center justify-self-start">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Open menu"
                        aria-haspopup="dialog"
                        onClick={() => setMenuOpen(true)}
                        className="md:hidden"
                    >
                        <MenuIcon className="size-5" />
                    </Button>
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

                <div className="flex items-center gap-1 justify-self-end">
                    <ModeToggle />
                    <AvatarButton />
                </div>
            </header>

            <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
}
