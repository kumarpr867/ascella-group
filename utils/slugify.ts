export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .trim()
    .replace(/\s+/g, "-") // spaces → hyphens
}