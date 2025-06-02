import React from "react";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input
      ref={ref}
      className="border rounded px-3 py-2 w-full"
      {...props}
    />
  )
);
Input.displayName = "Input";