export interface LinkItem {
  title: string;
  link: string;
  tags: string[];
  description: string;
}
const STORAGE_KEY =("items");
// Get all links
export const getLinks = (): LinkItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LinkItem[]) : [];
  } catch {
    return [];
  }
};
// Save new link
export const saveLink = (link: LinkItem): void => {
  const links = getLinks();
  links.push(link);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
};
// Clear all links
export const clearLinks = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
export interface FormItem {
  title: string;
  link: string;
  tags: string;
  description: string;
}
export const loadItems = (): FormItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FormItem[]) : [];
  } catch (err) {
    console.error("Could not parse saved items:", err);
    return [];
  }
};
export const saveItems = (items: FormItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error("Could not save items:", err);
  }
};
export const clearItems = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
