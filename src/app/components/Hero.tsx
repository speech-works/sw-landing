import { SW_CALL_PHRASE, SW_SLOGAN, SW_TARGET_AUDIENCE } from "../constants";
import heroImg from "../../../public/assets/hero_img.png";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={heroImg}
        alt="Hero background"
        fill
        className="object-cover"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Content */}
      <div className="relative z-10 text-white px-6">
        <h3 className="text-2xl md:text-3xl font-bold mb-5 text-orange-400">
          {SW_TARGET_AUDIENCE}
        </h3>
        <h1 className="text-5xl md:text-6xl font-bold">{SW_CALL_PHRASE}</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">{SW_SLOGAN}</p>
        <div className="mt-6 flex gap-4 justify-center">
          {/* Navigation action → keep anchor */}
          <a
            href="/signup"
            className="rounded-xl bg-orange-400 px-6 py-3 font-semibold shadow hover:bg-orange-500 transition cursor-pointer"
          >
            Download the App
          </a>

          {/* UI action → button */}
          <button
            // onClick={() => {}}
            className="rounded-xl bg-white/90 px-6 py-3 font-semibold text-(--brand-brown) shadow hover:bg-white transition cursor-pointer"
          >
            Watch 90-sec Demo
          </button>
        </div>
      </div>
    </section>
  );
}
