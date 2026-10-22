import type { ImageId } from "@/modules/locale-dictionary";
import { HexImage } from "./hex-image";
import styles from "./statement.module.css";

type Segment = { readonly text: string } | { readonly image: ImageId };

export function StatementWithThumbs({
  segments,
  alts,
  className,
}: {
  readonly segments: ReadonlyArray<Segment>;
  readonly alts: Record<ImageId, { readonly alt: string }>;
  readonly className?: string;
}) {
  return (
    <p className={className ?? styles.statement}>
      {segments.map((segment, index) => (
        <span key={index}>
          {index > 0 ? " " : null}
          {"text" in segment ? (
            segment.text
          ) : (
            <span className={styles.thumb}>
              <HexImage
                id={segment.image}
                alt={alts[segment.image].alt}
                className={styles.thumbImg}
                eager
              />
            </span>
          )}
        </span>
      ))}
    </p>
  );
}
