import Image from "next/image";
import { LoginForm } from "@/features/customer-flow/components/auth/login-form";
export function DesktopLoginSection() {
  return (
    <section className="hidden min-h-dvh grid-cols-2 bg-white lg:grid">
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
          <p className="text-sm font-semibold tracking-[0.3em] text-[#d8b08c]">FIVE SPIRITS</p>
          <h1 className="mt-5 max-w-xl text-6xl leading-[1.04] font-black">
            Exceptional spirits, carefully selected.
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center px-16">
        <div className="w-full max-w-md">
          <p className="text-sm font-bold tracking-[0.25em] text-[#a67854]">CUSTOMER PORTAL</p>
          <h2 className="mt-4 text-4xl font-black">Welcome</h2>
          <p className="mt-3 text-base text-[#6b7280]">
            Enter your details to access the Five Spirits catalogue.
          </p>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
