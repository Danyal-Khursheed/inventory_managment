/** Product category enum for warehouse items (e.g. PDF "Product Category" column) */
export const PRODUCT_CATEGORIES = ['Carry-On', 'Check-In'] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export function isProductCategory(value: string): value is ProductCategory {
  return PRODUCT_CATEGORIES.includes(value as ProductCategory);
}

export function normalizeProductCategory(value: string): ProductCategory | '' {
  const trimmed = value.trim();
  if (isProductCategory(trimmed)) return trimmed;
  const lower = trimmed.toLowerCase();
  if (lower === 'carry-on' || lower === 'carry on') return 'Carry-On';
  if (lower === 'check-in' || lower === 'check in') return 'Check-In';
  return '';
}
