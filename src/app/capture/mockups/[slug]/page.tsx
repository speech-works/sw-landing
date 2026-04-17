import { notFound } from "next/navigation";
import { Suspense } from "react";

import mockupCaptureSpecs from "@/mockup-capture/specs.json";
import MockupCaptureView from "./MockupCaptureView";

type CapturePageProps = {
  params: Promise<{ slug: string }>;
};

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export function generateStaticParams() {
  return mockupCaptureSpecs.map((spec) => ({ slug: spec.slug }));
}

export default async function MockupCapturePage({
  params,
}: CapturePageProps) {
  const { slug } = await params;
  const spec = mockupCaptureSpecs.find((item) => item.slug === slug);

  if (!spec) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <main
          className="overflow-hidden"
          style={{
            width: `${spec.width}px`,
            height: `${spec.height}px`,
            background: spec.background,
          }}
        />
      }
    >
      <MockupCaptureView
        slug={slug}
        width={spec.width}
        height={spec.height}
        background={spec.background}
      />
    </Suspense>
  );
}
