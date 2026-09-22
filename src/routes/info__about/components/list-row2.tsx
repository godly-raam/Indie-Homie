export type ListRow2Data = {
  href: string;
  label: string;
};
/** A list row. */
export default function ListRow2({ d }: { d: ListRow2Data }) {
  return (
    <li className="list-item">
      <a className="inline text-primary underline [text-decoration-style:dotted] cursor-grabbing" data-component="link" href={d.href}>
        {d.label}
      </a>
    </li>
  );
}
