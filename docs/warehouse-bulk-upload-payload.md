# Warehouse items bulk upload – payload format

**Endpoint:** `POST /api/warehouse-items/create-warehouse-items-bulk`

## Request body (full payload)

```json
{
  "items": [
    {
      "name": "string",
      "sku": "string",
      "upc": "string",
      "pricePerItem": 0,
      "weightPerItem": 0,
      "quantity": 0,
      "warehouseId": "string (UUID, optional – default: BixBites warehouse id)",
      "productCategory": "string (optional – enum: \"Carry-On\" | \"Check-In\")",
      "retrnxboxDamaged": 0
    }
  ]
}
```

## Field reference

| Field              | Type   | Required | Notes |
|--------------------|--------|----------|--------|
| `name`             | string | yes      | Product name. From PDF: “Brand Name” + “Product Category” combined, or fallback to SKU / “Unnamed”. |
| `sku`              | string | yes      | Stock keeping unit. |
| `upc`              | string | no*      | Barcode. *Backend should accept `""` for PDF rows that have no UPC. |
| `pricePerItem`     | number | no*      | *Optional in file; frontend sends `0` when missing. |
| `weightPerItem`    | number | no*      | *Optional in file; frontend sends `0` when missing. |
| `quantity`         | number | yes      | From PDF: “Actual” or “Physical Count” or “Count”. |
| `warehouseId`      | string | no*      | UUID. *Optional; frontend sends default BixBites id when missing. |
| `productCategory`  | string | no       | **Enum:** `"Carry-On"` \| `"Check-In"`. From PDF “Product Category” column. Empty string when missing. |
| `retrnxboxDamaged` | number | no       | **RETRNXBOX-DAMAGED** count from PDF. Frontend sends `0` when missing. |

## Single item create/update (for reference)

**Create:** `POST /api/warehouse-items/create-warehouse-item`  
**Update:** `PATCH /api/warehouse-items/update-warehouse-item?id={id}`

Same per-item shape as above (including `productCategory` and `retrnxboxDamaged`). Listing/GET should return these fields so the UI can show them.

## Backend checklist

1. **Allow empty `upc`** – accept `""` or omit.
2. **Optional `pricePerItem` and `weightPerItem`** – default to `0` if omitted.
3. **Optional `warehouseId`** – use default warehouse (e.g. BixBites `ec9bf329-e5ad-45dc-85a1-d5e2a86579c4`) when missing.
4. **`productCategory`** – optional string; allow only `"Carry-On"` and `"Check-In"` (or empty).
5. **`retrnxboxDamaged`** – optional number; default `0`; store and return in listing.

## Example payload (with productCategory and retrnxboxDamaged)

```json
{
  "items": [
    {
      "name": "NOBL Carry-On: All-in-One Baby Blue Carry-On",
      "sku": "AllBL1",
      "upc": "749460449034",
      "pricePerItem": 0,
      "weightPerItem": 0,
      "quantity": 34,
      "warehouseId": "ec9bf329-e5ad-45dc-85a1-d5e2a86579c4",
      "productCategory": "Carry-On",
      "retrnxboxDamaged": 0
    },
    {
      "name": "NOBL Carry-On: All-in-One Beige Carry-On",
      "sku": "AllBE1",
      "upc": "749460449089",
      "pricePerItem": 0,
      "weightPerItem": 0,
      "quantity": 5,
      "warehouseId": "ec9bf329-e5ad-45dc-85a1-d5e2a86579c4",
      "productCategory": "Carry-On",
      "retrnxboxDamaged": 2
    }
  ]
}
```

## CSV/Excel column names supported by frontend

- **Name:** `name`, `brand name`, `Brand Name`, `product name`; **Product Category:** `product category`, `Product Category`, `category` (also stored separately as `productCategory` when value is Carry-On or Check-In).
- **Quantity:** `quantity`, `actual`, `Actual`, `physical count`, `Physical Count`, `count`, `Count`.
- **RETRNXBOX-DAMAGED:** `retrnxbox damaged`, `RETRNXBOX-DAMAGED`, `retrnxbox-damaged`, `Damaged`.
- **SKU:** `sku`, `SKU`.
- **UPC:** `upc`, `UPC`.
- **Price/weight:** `pricePerItem`, `weightPerItem`, etc. (default 0 if missing).

PDF must be exported to **CSV or XLSX** first; the app does not parse PDF binary.
