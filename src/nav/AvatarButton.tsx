export function AvatarButton() {
    return (
        <button
            type="button"
            aria-label="Account"
            className="grid size-8 place-items-center rounded-full border border-line bg-surface text-muted hover:text-ink"
        >
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="size-4.5"
            >
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20c.8-3.5 3.6-5 7-5s6.2 1.5 7 5" />
            </svg>
        </button>
    );
}
