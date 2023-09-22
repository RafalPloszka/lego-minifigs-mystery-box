interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <span className="text-xs text-red-400">{message ?? "Error"}</span>
);
