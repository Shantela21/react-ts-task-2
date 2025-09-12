export type LinkItem = {
  title: string;
  description?: string;
  tags?: string[]; // or string
};
export function filterLinks(links: LinkItem[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return links;
  return links.filter((l) => {
    const title = (l.title || "").toLowerCase();
    const desc = (l.description || "").toLowerCase();
    const tags = Array.isArray(l.tags) ? l.tags.join(" ") : l.tags || "";
    const tagsLower = tags.toLowerCase();
    // simple "contains" on any field
    return title.includes(q) || desc.includes(q) || tagsLower.includes(q);
  });
}
