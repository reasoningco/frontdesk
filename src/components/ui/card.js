import * as React from "react";
import { cn } from "../../lib/utils";

const Card = React.forwardRef(({ className, hover = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-neutral-200/50 bg-white text-neutral-900 shadow-sm overflow-hidden",
      "transition-all duration-300 ease-out",
      hover && "hover:shadow-md hover:-translate-y-1",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  <h3
    ref={ref}
    className={cn("font-serif text-xl font-normal leading-snug tracking-tight text-balance", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-neutral-600 leading-relaxed text-pretty", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const CardImage = React.forwardRef(({ className, alt, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative overflow-hidden", className)}
  >
    <img
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-105"
      {...props}
    />
  </div>
));
CardImage.displayName = "CardImage";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardImage };
