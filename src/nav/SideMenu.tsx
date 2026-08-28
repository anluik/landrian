import { useEffect, useRef } from "react";
import { CreateButton } from "./CreateButton";
import { SearchBox } from "./SearchBox";

interface SideMenuProps {
    open: boolean;
    onClose: () => void;
}

export function SideMenu({ open, onClose }: SideMenuProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open) dialog.showModal();
        else dialog.close();
    }, [open]);

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onClick={event => {
                if (event.target === event.currentTarget) onClose();
            }}
            className="side-menu m-0 h-svh max-h-none w-72 border-r border-line bg-canvas shadow-lg"
        >
            <div className="flex h-full flex-col gap-3 p-4">
                <SearchBox />
                <CreateButton />
            </div>
        </dialog>
    );
}
