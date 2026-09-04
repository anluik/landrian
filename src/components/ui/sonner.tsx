import type { CSSProperties } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
    CircleCheckIcon,
    InfoIcon,
    Loader2Icon,
    OctagonXIcon,
    TriangleAlertIcon
} from "lucide-react";
import { useTheme } from "@/theme/useTheme.ts";

function Toaster({ ...props }: ToasterProps) {
    const { theme } = useTheme();

    return (
        <Sonner
            theme={theme}
            position="top-right"
            offset={16}
            icons={{
                success: <CircleCheckIcon className="size-4" />,
                info: <InfoIcon className="size-4" />,
                warning: <TriangleAlertIcon className="size-4" />,
                error: <OctagonXIcon className="size-4" />,
                loading: <Loader2Icon className="size-4 animate-spin" />
            }}
            style={
                {
                    "--normal-bg":
                        "color-mix(in oklch, var(--popover) 85%, transparent)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--border)",
                    "--border-radius": "var(--radius-lg)"
                } as CSSProperties
            }
            toastOptions={{
                classNames: {
                    toast: "ring-1 ring-foreground/10 supports-backdrop-filter:backdrop-blur-md",
                    title: "font-heading text-sm font-medium",
                    description: "text-xs text-muted-foreground",
                    success: "[&_[data-icon]]:text-emerald-500",
                    error: "[&_[data-icon]]:text-destructive",
                    info: "[&_[data-icon]]:text-primary",
                    warning: "[&_[data-icon]]:text-amber-500"
                }
            }}
            {...props}
        />
    );
}

export { Toaster };
