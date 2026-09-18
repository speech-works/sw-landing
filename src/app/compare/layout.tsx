import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare homepage directions",
  robots: { index: false, follow: false },
};

export default function ComparisonLayout({ children }: { children: React.ReactNode }) {
  return children;
}
