"use client";
import { useState, useEffect, useCallback, useMemo } from "react";

type ResendTimerProps = {
  initialSeconds?: number;
  onResend: () => void;
};

export function ResendTimer({ initialSeconds = 60, onResend }: ResendTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  const canResend = useMemo(() => seconds <= 0, [seconds]);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const handleResend = useCallback(() => {
    if (!canResend) return;
    setSeconds(initialSeconds);
    onResend();
  }, [canResend, initialSeconds, onResend]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return (
    <p className="font-geist text-common-gray text-center text-sm">
      Didn&apos;t receive the OTP?{" "}
      {canResend ? (
        <button
          type="button"
          onClick={handleResend}
          className="text-common-black font-semibold underline"
        >
          Resend
        </button>
      ) : (
        <span className="text-common-black font-semibold">Resend in {display}</span>
      )}
    </p>
  );
}
