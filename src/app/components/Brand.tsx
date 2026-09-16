import Image from "next/image";
export default function Brand() {
  return (
    <>
      <Image
        className="brand-mark"
        src="/brand/mark.svg"
        width={27}
        height={31}
        alt=""
        priority
      />
      <span>Speechworks</span>
    </>
  );
}
