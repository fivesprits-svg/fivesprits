import Image from "next/image";

type IconCircleProps = {
  iconSrc: string;
  iconAlt?: string;
  iconWidth?: number;
  iconHeight?: number;
  variant?: "default" | "large";
  className?: string;
};

export function IconCircle({
  iconSrc,
  iconAlt = "",
  iconWidth = 24,
  iconHeight = 24,
  variant = "default",
  className = "",
}: IconCircleProps) {
  return (
    <div
      className={`${variant === "large" ? "customer-icon-circle-lg" : "customer-icon-circle"} ${className}`}
    >
      <Image src={iconSrc} alt={iconAlt} width={iconWidth} height={iconHeight} />
    </div>
  );
}
