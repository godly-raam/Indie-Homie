import type { MediaTileStyles } from "../_styles";
import { cn } from "../../../lib/utils";
export type MediaTileData = {
  alt: string;
  imgSrc: string;
  text: string;
};
/** A media tile. */
export default function MediaTile({ d, styles }: { d: MediaTileData; styles: MediaTileStyles }) {
  return (
    <figure className="block mb-4 max-md:mb-0">
      <img className={cn("w-60.5 block max-w-full mx-[0.8375rem] rounded-xs overflow-clip max-md:w-39 max-md:max-w-100 max-md:mx-0 md:max-lg:w-35.5 md:max-lg:mx-2", styles.className)} data-component="image" alt={d.alt} src={d.imgSrc} />
      {" "}
      <figcaption className="block mt-2">
        {d.text}
      </figcaption>
      {" "}
    </figure>
  );
}
