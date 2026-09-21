import type { MediaCardStyles } from "../_styles";
import { cn } from "../../../lib/utils";
export type MediaCardData = {
  alt: string;
  imgSrc: string;
  title: string;
  description: string;
  description2: string;
  description3: string;
  description4: string;
  description5: string;
};
/** A card with media + heading. */
export default function MediaCard({ d, styles }: { d: MediaCardData; styles: MediaCardStyles }) {
  return (
    <article className="block mb-4 p-2.5 rounded-[5px] overflow-hidden bg-clr-3">
      <figure className="block float-left max-w-30 mr-5 mb-4">
        <img className={cn("w-30 inline max-w-full max-h-50 mt-[0.3125rem] rounded-xs overflow-clip shadow-[var(--clr-2)_1px_2px_2px_0px]", styles.className)} data-component="image" alt={d.alt} src={d.imgSrc} />
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
      <details className="block">
        <summary className="list-item list-inside cursor-grabbing">
          {"\n                Review\n              "}
        </summary>
        {" "}
        <p className="block mb-4 text-justify">
          {d.description4}
        </p>
        {" "}
        <p className="block mb-4 text-justify">
          {d.description5}
        </p>
        {" "}
      </details>
      {" "}
    </article>
  );
}
