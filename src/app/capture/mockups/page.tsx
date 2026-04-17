import Link from "next/link";

import mockupCaptureSpecs from "@/mockup-capture/specs.json";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: "Mockup Capture Index",
};

export default function MockupCaptureIndexPage() {
  return (
    <main className="min-h-screen bg-[#0f0f10] px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight">
          Mockup Capture Index
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
          These routes are meant for automated export only. Open a slug directly
          or use the capture script to render transparent composition assets.
        </p>

        <div className="mt-8 grid gap-3">
          {mockupCaptureSpecs.map((spec) => (
            <Link
              key={spec.slug}
              href={`/capture/mockups/${spec.slug}`}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.06]"
            >
              <div className="text-sm font-semibold text-white">{spec.name}</div>
              <div className="mt-1 text-xs text-white/55">
                {spec.slug} • {spec.width}x{spec.height}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
