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

// function EmptyStateIcon({ type }: { type: "box" | "star" | "tag" }) {
//   if (type === "box") {
//     return (
//       <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M24 4L42 14V34L24 44L6 34V14L24 4Z" stroke="#8C6D4F" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
//         <path d="M24 44V24" stroke="#8C6D4F" strokeWidth="2.5" />
//         <path d="M6 14L24 24L42 14" stroke="#8C6D4F" strokeWidth="2.5" strokeLinejoin="round" />
//         <path d="M15 9L33 19" stroke="#8C6D4F" strokeWidth="2.5" strokeLinecap="round" />
//       </svg>
//     );
//   }
//   if (type === "star") {
//     return (
//       <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M24 6L28.5 18.5H41.5L31 26.5L35 39L24 31L13 39L17 26.5L6.5 18.5H19.5L24 6Z" stroke="#8C6D4F" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
//       </svg>
//     );
//   }
//   return (
//     <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <circle cx="24" cy="24" r="16" stroke="#8C6D4F" strokeWidth="2.5" fill="none" />
//       <path d="M18 24C18 20.686 20.686 18 24 18C27.314 18 30 20.686 30 24" stroke="#8C6D4F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
//       <path d="M16 30L32 18" stroke="#8C6D4F" strokeWidth="2.5" strokeLinecap="round" />
//       <circle cx="18" cy="30" r="3" stroke="#8C6D4F" strokeWidth="2" fill="none" />
//       <circle cx="32" cy="22" r="3" stroke="#8C6D4F" strokeWidth="2" fill="none" />
//     </svg>
//   );
// }

export function EmptyState({ icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-6 pt-16 pb-24 text-center md:px-12 md:pt-24 md:pb-32">
      <div className="grid size-[120px] place-items-center rounded-full bg-[#F5EDE4] md:size-[140px]">
        {/* <EmptyStateIcon type={icon} /> */}
        <Image src={icon} alt={title} width={80} height={80} className="object-contain p-2" />
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
