import * as React from "react"
import { cn } from "@/lib/utils"

const FieldGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-2", className)}
    {...props}
  />
))
FieldGroup.displayName = "FieldGroup"

const Field = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex gap-2",
      orientation === "horizontal" ? "flex-row items-start" : "flex-col",
      className
    )}
    {...props}
  />
))
Field.displayName = "Field"

const FieldContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
))
FieldContent.displayName = "FieldContent"

const FieldLabel = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
))
FieldLabel.displayName = "FieldLabel"

const FieldDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-muted-foreground", className)}
    {...props}
  />
))
FieldDescription.displayName = "FieldDescription"

export { FieldGroup, Field, FieldContent, FieldLabel, FieldDescription }
