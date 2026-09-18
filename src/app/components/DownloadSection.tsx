import Image from "next/image";
import StoreButtons from "./StoreButtons";
import Avatar from "./Avatar";
import Link from "next/link";
import DownloadRibbon from "./DownloadRibbon";

export default function DownloadSection({ programTitle, outcome = false }: { programTitle?: string; outcome?: boolean }) {
  return (
    <>
      <DownloadRibbon />
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
          <h2 id="download-title">Get Speechworks.</h2>
          <p>
            {programTitle
              ? `Download the app and look for ${programTitle}. See the price before you buy.`
              : outcome
                ? "Download Speechworks and choose a program. You can check the price before you buy."
                : "Start with free daily practice and a free AI call. Buy a program when you are ready."}
          </p>
          <StoreButtons />
          <p className="download-note">
            Free to download, with free daily practice. Pay once for each program.
          </p>
          <div className="download-reassurance">
            <p>Pay once for a program. Membership and extra AI call credits cost extra and are optional.</p>
            <Link href="/privacy/">How we use your data <span aria-hidden="true">↗</span></Link>
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
            <span>Get the app on your phone.</span>
          </div>
          <span className="qr-caption">Scan with your phone camera</span>
        </div>
      </section>
    </>
  );
}
