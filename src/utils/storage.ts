export interface FormItem {
  title: string;
  link: string;
  tags: string;
  description: string;
}

const STORAGE_KEY = "items";

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
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Could not clear items:", err);
  }
};

export const isValidUrl = (value: string): boolean => {
  if (!value) return false;
  try {
    const tested = value.match(/^https?:\/\//i) ? value : `http://${value}`;
    // eslint-disable-next-line no-unused-vars
    const u = new URL(tested);
    return true;
  } catch {
    return false;
  }
};
