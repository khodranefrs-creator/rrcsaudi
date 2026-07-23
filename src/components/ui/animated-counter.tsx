"use client"

import * as React from "react"
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion"

import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  target: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
  className?: string
}

function AnimatedCounter({
  target,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  className,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    return latest.toFixed(decimals)
  })

  React.useEffect(() => {
    if (!isInView) return

    const controls = animate(count, target, {
      duration,
      ease: "easeOut",
    })

    return controls.stop
  }, [isInView, count, target, duration])

  const formatted = useTransform(rounded, (val) => {
    const parts = val.split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return `${prefix}${parts.join(".")}${suffix}`
  })

  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums", className)}
    >
      {formatted}
    </motion.span>
  )
}

export { AnimatedCounter }
