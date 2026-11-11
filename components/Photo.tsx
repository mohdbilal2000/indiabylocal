import Image from "next/image";
import credits from "@/lib/photos.json";

type Credit = { w: number; h: number; subject: string; artist: string; license: string; source: string };
export const photoCredits = credits as Record<string, Credit>;

export const hasPhoto = (key: string) => key in photoCredits;

/** A photograph from public/photos, filling its parent. The parent sets the aspect ratio. */
export function Photo({
  name,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  name: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const c = photoCredits[name];
  if (!c) return <div className={`bg-surface-alt ${className}`} aria-hidden="true" />;
  return (
    <Image
      src={`/photos/${name}.jpg`}
      alt={alt ?? c.subject}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
