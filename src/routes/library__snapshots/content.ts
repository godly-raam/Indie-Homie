export type MentalNoteEntry = {
  id: string;
  title: string;
  date: string;
  imageSrc?: string;
  imageAlt?: string;
  content: string;
};

export const mentalNoteEntries: MentalNoteEntry[] = [];
