import Image from "next/image";
import Link from "next/link";

type EmptyStateProps = {
  // icon: "box" | "star" | "tag";
  icon: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
};

export function EmptyState({ icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-6 py-4 text-center md:px-12">
      <div className="grid size-[80px] place-items-center rounded-full bg-[#F5EDE4] md:size-[100px]">
        {/* <EmptyStateIcon type={icon} /> */}
        <Image src={icon} alt={title} width={60} height={60} className="object-contain p-2" />
      </div>
      <h2 className="font-unbounded text-common-black mt-6 text-xl font-black md:mt-8 md:text-2xl">
        {title}
      </h2>
      <p className="font-geist text-common-gray mt-3 max-w-[280px] text-sm leading-relaxed md:mt-4 md:max-w-sm md:text-base">
        {description}
      </p>
      <Link
        href={actionHref}
        className="customer-continue-button mt-6 flex max-w-[280px] items-center justify-center md:mt-8 md:max-w-xs"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
