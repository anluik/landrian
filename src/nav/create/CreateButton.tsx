import {
    useEffect,
    useRef,
    useState,
    type ComponentType,
    type ReactNode
} from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import { CreateMenu } from "./CreateMenu.tsx";
import { NewIssueForm } from "./NewIssueForm.tsx";

export type CreateViewId = "menu" | "newIssue";

export interface CreateViewProps {
    onNavigate: (view: CreateViewId) => void;
    onClose: () => void;
}

interface CreateViewConfig {
    title: string;
    component: ComponentType<CreateViewProps>;
    back?: CreateViewId;
}

const createViews: Record<CreateViewId, CreateViewConfig> = {
    menu: { title: "Create", component: CreateMenu },
    newIssue: { title: "New issue", component: NewIssueForm, back: "menu" }
};

const viewTransition = {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" }
};

export function CreateButton({ onOpen }: { onOpen?: () => void }) {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState<CreateViewId>("menu");
    const { title, component: View, back } = createViews[view];

    return (
        <Dialog
            open={open}
            onOpenChange={next => {
                if (next) {
                    setView("menu");
                    onOpen?.();
                }
                setOpen(next);
            }}
        >
            <DialogTrigger render={<Button>Create</Button>} />
            <DialogContent>
                <DialogTitle className="sr-only">Create</DialogTitle>
                <MotionConfig
                    reducedMotion="user"
                    transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                >
                    <AnimatedHeight>
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                                key={view}
                                {...viewTransition}
                                className="flex flex-col gap-4"
                            >
                                <div className="flex items-center gap-1.5">
                                    {back && (
                                        <Button
                                            variant="ghost"
                                            size="icon-xs"
                                            className="-ml-1"
                                            onClick={() => setView(back)}
                                        >
                                            <ChevronLeftIcon />
                                            <span className="sr-only">
                                                Back
                                            </span>
                                        </Button>
                                    )}
                                    <div className="font-heading text-base leading-none font-medium">
                                        {title}
                                    </div>
                                </div>
                                <View
                                    onNavigate={setView}
                                    onClose={() => setOpen(false)}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </AnimatedHeight>
                </MotionConfig>
            </DialogContent>
        </Dialog>
    );
}

function AnimatedHeight({ children }: { children: ReactNode }) {
    const [height, setHeight] = useState<number | "auto">("auto");
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;
        const observer = new ResizeObserver(() => {
            setHeight(content.offsetHeight);
        });
        observer.observe(content);
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div animate={{ height }} className="relative overflow-hidden">
            <div ref={contentRef}>{children}</div>
        </motion.div>
    );
}
