"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

interface RevealProps {
  children?: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  style?: CSSProperties;
  [key: string]: unknown;
}

/* Revela elementos al entrar en viewport. Migrado desde assets/components.jsx.
   Solo anima transform: el contenido nunca queda invisible. */
export function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  style = {},
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < (window.innerHeight || 800) * 0.95) {
      setShown(true);
      return;
    }
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    const t = setTimeout(() => setShown(true), 1500);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [shown]);

  return createElement(
    as,
    {
      ref,
      className: "reveal " + (shown ? "in " : "") + className,
      style: { transitionDelay: delay ? `${delay}ms` : undefined, ...style },
      ...rest,
    },
    children
  );
}
