import Image from "next/image";
import StoreButtons from "./StoreButtons";
import Avatar from "./Avatar";

export default function DownloadSection() {
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
        <h2 id="download-title">Find your program in the app.</h2>
        <p>
          You can read the program outlines here before downloading Speechworks.
        </p>
        <StoreButtons />
        <p className="download-note">
          Free to download. Programs purchased separately.
        </p>
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
