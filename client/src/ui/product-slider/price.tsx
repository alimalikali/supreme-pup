type PriceProps = {
  price?: { current: number; currency?: "USD" | "EUR" | "INR" } | null;
};

export const Price = ({ price }: PriceProps) => {
  if (!price) return null;

  // Default to USD if currency is not provided
  const currency = price.currency || "USD";

  const formatter = new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return <>{formatter.format(price.current)}</>;
};
