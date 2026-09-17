import Image from "next/image";
import StoreButtons from "./StoreButtons";
import Avatar from "./Avatar";
import Link from "next/link";

export default function DownloadSection({ programTitle }: { programTitle?: string }) {
  return (
    <section
      className="download-section"
      id="download"
      aria-labelledby="download-title"
    >
      <div className="download-copy" data-reveal>
        <div className="download-faces" aria-hidden="true">
          <Avatar name="coils" size={60} />
          <Avatar name="turban" size={60} />
          <Avatar name="silver" size={60} />
        </div>
        <h2 id="download-title">Get ready for your next conversation.</h2>
        <p>
          {programTitle
            ? `Download Speechworks, then find ${programTitle} in the app. Check the current price and what is included before you buy.`
            : "Choose a conversation you want to prepare for. Download Speechworks to find your program and see the current price before you buy."}
        </p>
        <StoreButtons />
        <p className="download-note">
          Download the app for free. Buy programs separately.
        </p>
        <div className="download-reassurance">
          <p>No subscription required to buy a program. Membership and extra AI call credits are optional purchases.</p>
          <p>Miss a day? Continue when you return. New days open over time; completed lessons stay available.</p>
          <Link href="/privacy/">Read how your data is handled <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="download-qr" data-reveal>
        <div className="qr-paper">
          <Image
            src="/download-qr.svg"
            alt="Scan to open the Speechworks download section on your phone"
            width={176}
            height={176}
          />
          <span>Scan to get Speechworks.</span>
        </div>
        <span className="qr-caption">Scan with your camera</span>
      </div>
    </section>
  );
}
