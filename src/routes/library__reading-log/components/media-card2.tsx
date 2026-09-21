import type { MediaCard2Styles } from "../_styles";
import { cn } from "../../../lib/utils";
export type MediaCard2Data = {
  alt: string;
  imgSrc: string;
  title: string;
  description: string;
  description2: string;
  description3: string;
};
/** A card with media + heading. */
export default function MediaCard2({ d, styles }: { d: MediaCard2Data; styles: MediaCard2Styles }) {
  return (
    <article className="block mb-4 p-2.5 rounded-[5px] overflow-hidden bg-clr-3">
      <figure className="block float-left max-w-30 mr-5 mb-4">
        <img className={cn("inline max-w-full max-h-50 mt-[0.3125rem] rounded-xs overflow-clip shadow-[var(--clr-2)_1px_2px_2px_0px]", styles.className)} data-component="image" alt={d.alt} src={d.imgSrc} />
      </figure>
      {" "}
      <h4 className="border border-outset border-accent block mt-[2.9px] p-[0.1875rem] rounded-[1px] text-sm leading-[0.8125rem] bg-surface-2" data-component="heading">
        {d.title}
      </h4>
      {" "}
      <p className="block mb-4">
        <em className="inline italic">
          {d.description}
          <br className="inline" />
          {d.description2}
        </em>
        <br className="inline" />
        {d.description3}
      </p>
      {" "}
    </article>
  );
}
