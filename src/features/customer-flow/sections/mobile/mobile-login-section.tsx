import Image from "next/image";
import { LoginForm } from "@/features/customer-flow/components/auth/login-form";
import {
  MobileHomeIndicator,
  MobileStatusBar,
} from "@/features/customer-flow/components/navigation/mobile-system-chrome";
export function MobileLoginSection() {
  return (
    <section className="mx-auto min-h-dvh w-full max-w-[390px] bg-white lg:hidden">
      <MobileStatusBar />
      <div className="flex h-[108px] items-center gap-3 px-6 pt-4">
        <Image src="/customer-flow/icons/logo-mark.svg" alt="Five Spirits" width={44} height={76} />
      </div>
      <div className="px-6 pt-10">
        <h1 className="text-[32px] leading-[37px] font-bold">Welcome</h1>
        <p className="mt-3 text-sm leading-[21px] text-[#6b7280]">
          Enter your mobile number to verify your identity and get started.
        </p>
        <LoginForm />
      </div>
      <MobileHomeIndicator />
    </section>
  );
}
