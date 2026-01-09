export interface FormItem {
  title: string;
  link: string;
  tags: string;
  description: string;
}

const STORAGE_KEY = "items";

export const loadItems = (): FormItem[] => {
  try {
    // Check if localStorage is available
    if (typeof window === 'undefined' || !window.localStorage) {
      console.error("[Storage] localStorage is not available");
      return [];
    }
    
    const raw = localStorage.getItem(STORAGE_KEY);
    console.log("[Storage] Raw data from localStorage:", raw);
    
    const parsed = raw ? (JSON.parse(raw) as FormItem[]) : [];
    console.log("[Storage] Loaded items:", parsed);
    return parsed;
  } catch (err) {
    console.error("Could not parse saved items:", err);
    return [];
  }
};

export const saveItems = (items: FormItem[]): void => {
  try {
    // Check if localStorage is available
    if (typeof window === 'undefined' || !window.localStorage) {
      console.error("[Storage] localStorage is not available");
      return;
    }
    
    console.log("[Storage] Saving items:", items);
    console.log("[Storage] Items length:", items.length);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    console.log("[Storage] Items saved successfully");
    // Verify it was saved
    const saved = localStorage.getItem(STORAGE_KEY);
    console.log("[Storage] Verification - saved data:", saved);
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
  if (!value || typeof value !== 'string') return false;
  
  const trimmedValue = value.trim();
  if (!trimmedValue) return false;
  
  // Basic URL pattern check - must contain at least a domain and TLD
  const urlPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  
  // If it already has http/https, test it directly
  if (trimmedValue.match(/^https?:\/\//i)) {
    return urlPattern.test(trimmedValue);
  }
  
  // If no protocol, try adding http:// and test
  try {
    const withProtocol = `http://${trimmedValue}`;
    return urlPattern.test(withProtocol);
  } catch {
    return false;
  }
};

export const debugLocalStorage = (): void => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.error("[Storage] localStorage is not available");
      return;
    }
    
    console.log("[Storage] Debug - All localStorage keys:", Object.keys(localStorage));
    console.log("[Storage] Debug - Items key value:", localStorage.getItem(STORAGE_KEY));
    console.log("[Storage] Debug - localStorage length:", localStorage.length);
  } catch (err) {
    console.error("[Storage] Debug error:", err);
  }
};
