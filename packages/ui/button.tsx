"use client";

import { ReactNode } from "react";

export function Button({ children, className, ...props }:
  {
    children: ReactNode;
    className?: string;
  } extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> ? React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> : never
): JSX.Element {
  return (
    // eslint-disable-next-line no-alert
    <button type="button" {...props} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}>
      {children}
    </button>
  );
}
