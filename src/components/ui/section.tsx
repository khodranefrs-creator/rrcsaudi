import * as React from "react"

import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  arabicTitle?: string
  arabicSubtitle?: string
  containerClassName?: string
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      containerClassName,
      title,
      subtitle,
      arabicTitle,
      arabicSubtitle,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn("py-12 md:py-16 lg:py-20", className)}
        {...props}
      >
        <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", containerClassName)}>
          {(title || arabicTitle) && (
            <div className="mb-8 md:mb-12">
              {title && (
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {title}
                </h2>
              )}
              {arabicTitle && (
                <h2
                  className="text-3xl font-bold tracking-tight sm:text-4xl"
                  dir="rtl"
                >
                  {arabicTitle}
                </h2>
              )}
              {subtitle && (
                <p className="mt-2 text-lg text-charcoal-500">
                  {subtitle}
                </p>
              )}
              {arabicSubtitle && (
                <p
                  className="mt-2 text-lg text-charcoal-500"
                  dir="rtl"
                >
                  {arabicSubtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </section>
    )
  }
)
Section.displayName = "Section"

export { Section }
