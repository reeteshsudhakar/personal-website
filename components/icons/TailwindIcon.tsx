import type { SVGProps } from "react";

/**
 * Minimal Tailwind CSS logo (the tail mark).
 * Accepts size and className to match NavbarIcon / Tabler icon usage.
 */
export function TailwindIcon({ size = 24, className, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 54 33"
            width={size}
            height={size}
            className={className}
            fill="currentColor"
            {...props}
        >
            <path d="M27 0l27 33H0L27 0z" />
        </svg>
    );
}
