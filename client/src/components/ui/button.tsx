import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"


import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost"
  size?: "default" | "icon" | "sm"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([])

    const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()

      setRipples((prevRipples) => [...prevRipples, { x, y, id }])

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== id))
      }, 600)
    }

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
          size === "default" && "h-9 px-4 py-2",
          size === "icon" && "h-9 w-9",
          className
        )}
        ref={ref}
        onClick={addRipple}
        {...props}
        style={{ position: "relative", overflow: "hidden", ...props.style }}
      >
        {props.children}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute block rounded-full bg-white/20 animate-ripple pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "100px",
              height: "100px",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none"
            }}
          />
        ))}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button }
