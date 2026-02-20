import { DEFAULT_WAREHOUSE_ID } from './default-warehouse';
import { normalizeProductCategory } from './product-category';

/** Normalized item shape sent to create-warehouse-items-bulk (and PDF stock format compatible) */
export interface WarehouseBulkItem {
  name: string;
  sku: string;
  upc: string;
  pricePerItem: number;
  weightPerItem: number;
  quantity: number;
  warehouseId: string;
  /** Carry-On | Check-In */
  productCategory: string;
  /** RETRNXBOX-DAMAGED count */
  retrnxboxDamaged: number;
}

const normalizeKey = (s: string) => s.toLowerCase().replace(/\s+/g, '').trim();

/** Get first value from row where key matches any of the given key variants (case-insensitive, spaces ignored) */
function getStr(
  row: Record<string, unknown>,
  ...keyVariants: string[]
): string {
  const rowKeys = Object.keys(row);
  for (const variant of keyVariants) {
    const n = normalizeKey(variant);
    const found = rowKeys.find((k) => normalizeKey(k) === n);
    if (found != null) {
      const v = row[found];
      if (v !== undefined && v !== null && v !== '') return String(v).trim();
    }
  }
  return '';
}

function getNum(
  row: Record<string, unknown>,
  ...keyVariants: string[]
): number {
  const s = getStr(row, ...keyVariants);
  if (s === '') return 0;
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Map a raw row (CSV/XLSX) to WarehouseBulkItem.
 * Supports standard columns and PDF "WAREHOUSE STOCK PHYSICAL" format:
 * - Brand Name, Product Category (or Name) → name
 * - SKU, UPC → sku, upc
 * - Quantity in app = Actual Physical Count from CSV (columns: "Actual Physical Count", "Physical Count", "Actual", "Quantity", "Count")
 * - pricePerItem, weightPerItem optional (default 0)
 * - warehouseId optional (default BixBites id)
 */
export function rawRowToWarehouseItem(
  row: Record<string, unknown>
): WarehouseBulkItem {
  const namePart = getStr(
    row,
    'name',
    'brandname',
    'brand name',
    'productname',
    'product name',
    'Brand Name'
  );
  const categoryPart = getStr(
    row,
    'productcategory',
    'product category',
    'category',
    'Product Category'
  );
  const name = [namePart, categoryPart].filter(Boolean).join(' ').trim();

  const sku = getStr(row, 'sku', 'SKU');
  const upc = getStr(row, 'upc', 'UPC');

  // Quantity in app = Actual Physical Count from CSV (try these column names first)
  const quantity = getNum(
    row,
    'actual physical count',
    'Actual Physical Count',
    'actualphysicalcount',
    'physical count',
    'Physical Count',
    'physicalcount',
    'actual',
    'Actual',
    'quantity',
    'Quantity',
    'count',
    'Count'
  );

  const productCategoryRaw = getStr(
    row,
    'productcategory',
    'product category',
    'Product Category',
    'category',
    'Category'
  );
  const productCategory = normalizeProductCategory(productCategoryRaw) || '';

  const retrnxboxDamaged = getNum(
    row,
    'retrnxboxdamaged',
    'retrnxbox damaged',
    'RETRNXBOX-DAMAGED',
    'retrnxbox-damaged',
    'Damaged'
  );

  const pricePerItem = getNum(
    row,
    'priceperitem',
    'price per item',
    'price',
    'PricePerItem',
    'pricePerItem'
  );
  const weightPerItem = getNum(
    row,
    'weightperitem',
    'weight per item',
    'weight',
    'WeightPerItem',
    'weightPerItem'
  );

  const warehouseIdRaw = getStr(
    row,
    'warehouseid',
    'warehouse id',
    'WarehouseId',
    'warehouseId'
  );
  const warehouseId =
    warehouseIdRaw && warehouseIdRaw.length > 0
      ? warehouseIdRaw
      : DEFAULT_WAREHOUSE_ID;

  return {
    name: name || sku || 'Unnamed',
    sku: sku || '',
    upc: upc || '',
    pricePerItem,
    weightPerItem,
    quantity,
    warehouseId,
    productCategory,
    retrnxboxDamaged
  };
}

/** Skip row if it has no meaningful data (no sku, no name, no quantity) */
export function isRowEmpty(row: Record<string, unknown>): boolean {
  const sku = getStr(row, 'sku', 'SKU');
  const name = getStr(
    row,
    'name',
    'brandname',
    'brand name',
    'Brand Name',
    'product name'
  );
  const category = getStr(
    row,
    'productcategory',
    'product category',
    'Product Category'
  );
  const qty = getNum(
    row,
    'actual physical count',
    'Actual Physical Count',
    'physical count',
    'Physical Count',
    'actual',
    'quantity',
    'Quantity',
    'count',
    'Count'
  );
  const hasContent =
    sku.length > 0 || name.length > 0 || category.length > 0 || qty !== 0;
  return !hasContent;
}
