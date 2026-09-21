export type ListRowData = {
  href: string;
  label: string;
};
/** A list row. */
export default function ListRow({ d }: { d: ListRowData }) {
  return (
    <li className="list-item">
      <a className="inline text-color-005 underline [text-decoration-style:dotted] cursor-grabbing" data-component="link" href={d.href}>
        {d.label}
      </a>
    </li>
  );
}
