import type { ImageId } from "@/modules/locale-dictionary";

const DIMS: Record<ImageId, { readonly w: number; readonly h: number }> = {
  queen: { w: 1066, h: 1600 },
  comb: { w: 1600, h: 1218 },
  freshComb: { w: 1200, h: 1600 },
  catba: { w: 1026, h: 1600 },
  nectar: { w: 1600, h: 1264 },
  plate: { w: 975, h: 1600 },
};

export function imageAspect(id: ImageId): number {
  const d = DIMS[id];
  return d.w / d.h;
}

export function HexImage({
  id,
  alt,
  className,
  eager,
}: {
  readonly id: ImageId;
  readonly alt: string;
  readonly className?: string;
  readonly eager?: boolean;
}) {
  const d = DIMS[id];
  return (
    <img
      src={`/images/${id}.jpg`}
      alt={alt}
      width={d.w}
      height={d.h}
      loading={eager ? "eager" : "lazy"}
      className={className === undefined ? "hex-mask" : `hex-mask ${className}`}
    />
  );
}
