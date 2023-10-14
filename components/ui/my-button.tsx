import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type = 'button',
  ...props
}, ref) => {
  return (
    <button
    {...props}
    ref={ref}
    disabled={disabled}
    className={cn(
    `w-auto rounded-full bg-black dark:bg-zinc-100 border-transparent 
    text-white dark:text-black font-semibold hover:bg-zinc-700 
    transition px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50
    dark:hover:bg-zinc-300`,
    className
    )}>
      {children}
    </button>
  )
});

Button.displayName = 'Button';

export default Button;