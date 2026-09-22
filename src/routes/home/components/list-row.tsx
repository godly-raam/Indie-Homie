export type ListRowData = {
  href: string;
  text: string;
};
/** A list row. */
export default function ListRow({ d }: { d: ListRowData }) {
  return (
    <li className="list-item before:content-['❧_'] before:inline-block before:w-[0.9375rem] before:h-[1.1rem] before:mr-1.5 before:text-foreground before:text-lg before:leading-[1.125rem]">
      <a className="text-primary underline [text-decoration-style:dotted]" href={d.href}>
        {d.text}
      </a>
    </li>
  );
}
