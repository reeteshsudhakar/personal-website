import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ref: _ref, ...props }: React.ComponentProps<"svg">) {
    return (
        <Loader2Icon
            ref={_ref as React.Ref<SVGSVGElement>}
            role="status"
            aria-label="Loading"
            className={cn("size-4 animate-spin", className)}
            {...props}
        />
    );
}

export { Spinner };
