import Image from "next/image";
import { LoginForm } from "@/features/customer-flow/components/auth/login-form";
import {
  MobileHomeIndicator,
  MobileStatusBar,
} from "@/features/customer-flow/components/navigation/mobile-system-chrome";
export function MobileLoginSection() {
  return (
    <section className="customer-page-container lg:hidden">
      <MobileStatusBar />
      <div className="flex h-[108px] items-center gap-3 px-6 pt-4">
        <Image src="/customer-flow/icons/logo.svg" alt="Five Spirits" width={44} height={76} />
      </div>
      <div className="px-6 pt-10">
        <h1 className="customer-welcome-title">Welcome</h1>
        <p className="customer-welcome-description mt-3">
          Enter your mobile number to verify your identity and get started.
        </p>
        <LoginForm />
      </div>
      <MobileHomeIndicator />
    </section>
  );
}
