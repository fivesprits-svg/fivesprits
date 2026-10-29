type AuthRequestErrorProps = {
  message: string;
};

export function AuthRequestError({ message }: AuthRequestErrorProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex items-start gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm leading-5 text-red-800"
    >
      <svg
        className="mt-0.5 size-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5M12 16h.01" strokeLinecap="round" />
      </svg>
      <p className="font-geist m-0 font-medium">{message}</p>
    </div>
  );
}
