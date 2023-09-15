//HERE ARE ALL TYPEGUARDS FOR THE PROJECT

export function isExtendedItems(item: any): item is ExtendedItems {
  return typeof item.id === 'string' &&
    typeof item.productName === 'string' &&
    typeof item.description === 'string' &&
    typeof item.price === 'number' &&
    (item.cathegory === "" ||
      item.cathegory === "Sweater" ||
      item.cathegory === "Jacket" ||
      item.cathegory === "Shoes" ||
      item.cathegory === "Jeans" ||
      item.cathegory === "Accessories") &&
    typeof item.ImgURLone === 'string' &&
    typeof item.ImgURLtwo === 'string' &&
    typeof item.ImgURLthree === 'string' &&
    typeof item.brand === 'string' &&
    typeof item.collectionYear === 'number';
}

export function isValidProduct(product: any): product is ExtendedItems {
  const isValid = typeof product.id === 'string'
    && typeof product.productName === 'string'
    && typeof product.price === 'number'
    && typeof product.cathegory === 'string'
    && typeof product.ImgURLone === 'string';

  console.log("Type guard for product to cart is: ", isValid);
  return isValid;
}

export function isValidProductDetails(product: any): product is ExtendedItems {
  return (
    typeof product.id === 'string' &&
    typeof product.productName === 'string' &&
    typeof product.price === 'number' &&
    typeof product.cathegory === 'string' &&
    typeof product.ImgURLone === 'string' &&
    typeof product.ImgURLtwo === 'string' &&
    typeof product.ImgURLthree === 'string' &&
    typeof product.brand === 'string' &&
    typeof product.collectionYear === 'number'
  );
}