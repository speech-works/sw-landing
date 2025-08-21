import { SW_NAME } from "../constants";

export default function Cta() {
  return (
    <section className="bg-gray-50 py-16 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-(--brand-brown) mb-4">
        Join a community building better ways to speak — together
      </h2>
      <p className="text-gray-600 mb-6">
        Start your journey with {SW_NAME} today
      </p>
      <button className="rounded-lg bg-orange-400 px-6 py-3 text-white font-semibold shadow hover:bg-orange-500 transition cursor-pointer">
        Download the App
      </button>
    </section>
  );
}
