export type ArtworkEntry = {
  id: string;
  title: string;
  date?: string;
  imageSrc: string;
  imageAlt?: string;
  description?: string;
};

export const artworkEntries: ArtworkEntry[] = [];
