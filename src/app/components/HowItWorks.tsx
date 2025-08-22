import Image from "next/image";
import communityImg from "../../../public/assets/community_img.png";
import therapyImg from "../../../public/assets/therapy_img.png";
import resourcesImg from "../../../public/assets/resources_img.png";
const features = [
  {
    title: "Join Our Community",
    desc: "Engage with peers, share experiences, and find encouragement in our forum.",
    icon: communityImg,
  },
  {
    title: "Personalized Resources",
    desc: "Access a library of articles, exercises, and tools to support your speech journey.",
    icon: resourcesImg,
  },
  {
    title: "Connect with Therapists",
    desc: "Find certified speech therapists specializing in stuttering, tailored to your needs.",
    icon: therapyImg,
  },
];

export default function HowItWorks() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-(--brand-brown) text-center">
          How It Works
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 border rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4 h-80 w-full relative rounded-lg overflow-hidden">
                <Image
                  src={f.icon}
                  alt={f.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <h3 className="text-xl font-semibold text-(--brand-brown)">
                {f.title}
              </h3>
              <p className="mt-2 text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
