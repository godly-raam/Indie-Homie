export type ListRowData = {
  text: string;
  href: string;
  label: string;
};
/** A list row. */
export default function ListRow({ d }: { d: ListRowData }) {
  return (
    <li className="list-item">
      {d.text}
      <a className="inline text-primary underline [text-decoration-style:dotted] cursor-grabbing" data-component="link" href={d.href}>
        {d.label}
      </a>
    </li>
  );
}
