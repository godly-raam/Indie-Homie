export type ListRow3Data = {
  label: string;
};
/** A list row. */
export default function ListRow3({ d }: { d: ListRow3Data }) {
  return (
    <li className="list-item">
      <a className="inline text-primary underline [text-decoration-style:dotted] cursor-grabbing" data-component="link" href="/info/about">
        {d.label}
      </a>
    </li>
  );
}
