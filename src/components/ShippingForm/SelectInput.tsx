import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { ErrorMessage } from "./ErrorMessage";

interface SelectInputProps {
  id: string;
  label: string;
  options: string[];
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
}

export const SelectInput = ({ id, label, options, register, error, className: styles }: SelectInputProps) => (
  <div className={`mb-6 ${styles}`}>
    <label htmlFor={id} className="mb-2 block text-sm font-medium">
      {label}
    </label>
    <select
      id={id}
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      {...register}
    >
      <option value="">Select from the list...</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error ? <ErrorMessage message={error.message} /> : null}
  </div>
);
