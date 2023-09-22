import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface DateInputProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
}

export const DateInput = ({ id, label, register, error, className: styles }: DateInputProps) => (
  <div className={`mb-6 ${styles}`}>
    <label htmlFor={id} className="mb-2 block text-sm font-medium">
      {label}
    </label>
    <input
      id={id}
      type="date"
      max={new Date().toISOString().split("T")[0]}
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      {...register}
    />
    {error ? <ErrorMessage message={error.message} /> : null}
  </div>
);
