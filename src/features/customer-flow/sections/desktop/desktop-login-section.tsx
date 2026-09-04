import Image from "next/image";
import { LoginForm } from "@/features/customer-flow/components/auth/login-form";
export function DesktopLoginSection() {
  return (
    <section className="hidden min-h-dvh grid-cols-2 bg-white md:grid">
      <div className="relative overflow-hidden bg-black">
        <Image
          src="/customer-flow/categories/whisky.png"
          alt=""
          fill
          sizes="50vw"
          priority
          className="object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute right-16 bottom-16 left-16 text-white">
          <p className="text-brand-primary text-sm font-semibold tracking-[0.3em]">FIVE SPIRITS</p>
          <h1 className="mt-5 max-w-xl text-6xl leading-[1.04] font-black">
            Exceptional spirits, carefully selected.
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center px-16">
        <div className="w-full max-w-md">
          <p className="text-brand-primary text-sm font-bold tracking-[0.25em]">CUSTOMER PORTAL</p>
          <h2 className="font-unbounded text-common-black mt-4 text-4xl font-black uppercase">
            Welcome
          </h2>
          <p className="customer-section-description mt-3">
            Enter your mobile number to verify your identity and get started.{" "}
          </p>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
