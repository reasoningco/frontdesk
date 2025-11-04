import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 text-white shadow-sm hover:bg-primary-600 hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-primary-500",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-red-500",
        outline:
          "border border-neutral-300 bg-white text-neutral-700 shadow-sm hover:bg-neutral-50 hover:border-neutral-400 hover:shadow focus-visible:ring-neutral-500",
        secondary:
          "bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-200 hover:shadow focus-visible:ring-neutral-500",
        ghost: "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-neutral-500",
        link: "text-primary-600 underline-offset-4 hover:underline hover:text-primary-700 focus-visible:ring-primary-500",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2 text-sm",
        lg: "h-12 px-8 py-3 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }