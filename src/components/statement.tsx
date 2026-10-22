import type { ArtId } from "@/modules/locale-dictionary";
import { HexArt } from "./hex-art";
import styles from "./statement.module.css";

type Segment = { readonly text: string } | { readonly image: ArtId };

export function StatementWithThumbs({
  segments,
  alts,
  className,
}: {
  readonly segments: ReadonlyArray<Segment>;
  readonly alts: Record<ArtId, { readonly alt: string }>;
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
              <HexArt
                id={segment.image}
                alt={alts[segment.image].alt}
                className={styles.thumbImg}
              />
            </span>
          )}
        </span>
      ))}
    </p>
  );
}
