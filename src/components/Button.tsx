import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({ onClick, children, disabled, className: styles, ...props }: ButtonProps) => (
  <button
    className={`${
      disabled ? "bg-blue-200" : "bg-blue-400 hover:bg-blue-500"
    } rounded-full px-12 py-3 text-sm font-medium uppercase ${styles}`}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);
