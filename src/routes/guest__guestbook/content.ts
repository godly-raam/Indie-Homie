export type GuestbookEntry = {
  id: string;
  author: string;
  date: string;
  body: string;
  website?: string;
};

export const guestbookEntries: GuestbookEntry[] = [];
export const guestbookEntryCount = 0;
