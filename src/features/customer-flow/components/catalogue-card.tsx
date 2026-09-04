"use client";
import Image from "next/image";

type CatalogueCardProps = {
  image: string;
  title: string;
  subtitle?: string;
  price?: string;
  originalPrice?: string;
  badge?: string;
  onClick?: () => void;
  variant?: "category" | "brand" | "product";
  actionLabel?: string;
  actionVariant?: "add" | "request" | "requested";
  onAction?: () => void;
  quantity?: number;
  onQuantityChange?: (value: number) => void;
  onRemove?: () => void;
};

export function CatalogueCard({
  image,
  title,
  subtitle,
  price,
  originalPrice,
  badge,
  onClick,
  variant = "category",
  actionLabel,
  actionVariant = "add",
  onAction,
  quantity,
  onQuantityChange,
  onRemove,
}: CatalogueCardProps) {
  if (variant === "category") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="catalogue-card-category group cursor-pointer text-center"
      >
        <span className="catalogue-card-category-image">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 640px) 25vw, (max-width: 1024px) 18vw, 12vw"
            loading="eager"
            className="object-cover"
          />
        </span>
        <span className="catalogue-card-category-title">{title}</span>
      </button>
    );
  }

  if (variant === "brand") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="catalogue-card-brand group cursor-pointer text-center"
      >
        <span className="catalogue-card-brand-image">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="eager"
            className="object-contain transition-transform group-hover:scale-105"
          />
        </span>
        <span className="catalogue-card-brand-title">{title}</span>
      </button>
    );
  }

  return (
    <article className="catalogue-card-product">
      <div className="catalogue-card-product-image">
        {badge && <span className="catalogue-card-product-badge">{badge}</span>}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="eager"
          className="object-contain"
        />
      </div>
      <div className="catalogue-card-product-info">
        <h2 className="catalogue-card-product-name">{title}</h2>
        {subtitle && <p className="catalogue-card-product-pack">{subtitle}</p>}
        <div className="catalogue-card-product-price-row">
          {originalPrice && (
            <span className="catalogue-card-product-original-price">{originalPrice}</span>
          )}
          {price && <span className="catalogue-card-product-price">{price}</span>}
        </div>
      </div>
      <div className="catalogue-card-product-actions">
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className={`catalogue-card-product-action-btn ${
              actionVariant === "request"
                ? "catalogue-card-product-action-request"
                : actionVariant === "requested"
                  ? "catalogue-card-product-action-requested"
                  : "catalogue-card-product-action-add"
            }`}
          >
            {actionLabel}
          </button>
        )}
        {quantity != null && onQuantityChange && (
          <div className="catalogue-card-product-quantity">
            <button
              type="button"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="catalogue-card-product-quantity-btn"
            >
              −
            </button>
            <span className="catalogue-card-product-quantity-value">
              {String(quantity).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(quantity + 1)}
              className="catalogue-card-product-quantity-btn"
            >
              +
            </button>
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="catalogue-card-product-remove-btn"
              >
                🗑
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
