import Image from "next/image";
import { LoginForm } from "@/features/customer-flow/components/auth/login-form";
import {
  MobileHomeIndicator,
  // MobileStatusBar,
} from "@/features/customer-flow/components/navigation/mobile-system-chrome";
export function MobileLoginSection() {
  return (
    <section className="customer-page-container md:hidden">
      {/* <MobileStatusBar /> */}
      <div className="flex h-[108px] items-center gap-3 px-6 pt-4 md:h-[120px] md:justify-center md:px-12 md:pt-6">
        <Image src="/logo.svg" alt="Five Spirit" width={44} height={76} />
      </div>
      <div className="px-6 pt-10 md:px-12 md:pt-14">
        <h1 className="customer-welcome-title md:text-[40px]">Welcome</h1>
        <p className="customer-welcome-description mt-3 max-w-[320px] md:mt-4 md:text-lg md:leading-relaxed">
          Enter your mobile number to verify your identity and get started.
        </p>
        <LoginForm />
      </div>
      <MobileHomeIndicator />
    </section>
  );
}
