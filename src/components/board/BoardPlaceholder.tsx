import { Button } from "@/components/ui/button.tsx";
import { loadIssues } from "@/store/store.ts";

export function BoardLoading() {
    return (
        <div className="flex h-full items-center justify-center">
            <p className="animate-pulse font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Loading board
            </p>
        </div>
    );
}

export function BoardError() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <p className="font-mono text-xs font-semibold tracking-widest text-destructive uppercase">
                Could not load issues
            </p>
            <Button
                variant="outline"
                size="sm"
                onClick={() => void loadIssues()}
            >
                Retry
            </Button>
        </div>
    );
}
