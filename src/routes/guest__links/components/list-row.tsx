export type ListRowData = {
  href: string;
  label: string;
  text: string;
};
/** A list row. */
export default function ListRow({ d }: { d: ListRowData }) {
  return (
    <li className="list-item">
      <a className="inline text-primary underline [text-decoration-style:dotted] [cursor:alias]" data-component="link" href={d.href} target="_blank">
        {d.label}
      </a>
      {d.text}
    </li>
  );
}
