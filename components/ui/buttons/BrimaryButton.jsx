import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

/**
 * BrimaryButton Component
 *
 * A reusable link-based button component for navigation within a Next.js app.
 * It optionally renders a right-arrow icon and accepts custom styling via Tailwind classes.
 *
 * @component
 * @param {string} href - The URL path to navigate to. Passed to Next.js <Link>.
 * @param {React.ReactNode} children - The button label or content.
 * @param {boolean} [arrowIcon=false] - If true, renders a right-arrow icon after the text.
 * @param {string} [className=""] - Additional CSS/Tailwind classes for styling the button.
 *
 * @example
 * <BrimaryButton
 *   href="/about"
 *   arrowIcon
 *   className="bg-white text-black border border-black rounded-full px-4 py-2 hover:bg-black hover:text-white"
 * >
 *   Learn More
 * </BrimaryButton>
 */

const BrimaryButton = ({ href, children, arrowIcon = false, className = "" }) => {
    return (
        <Link
            href={href}
            className={`flex items-center justify-center gap-2 ${className}`}
        >
            <span>{children}</span>
            {arrowIcon && "→"}
        </Link>
    );
};

export default BrimaryButton;
