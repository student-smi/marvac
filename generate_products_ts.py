import json
import re

with open("src/data/marvac_products.json", "r", encoding="utf-8") as f:
    data = json.load(f)

products = data.get("products", [])
print(f"Total raw products: {len(products)}")

# Bestsellers in video:
# 1) Marvac Hair Styling Student Kit - Professional
# 2) Marvac H Strong Hold Hair Spray 300ml
# 3) Marvac Shine Hair Spray 300ml - Glossy Finish
# 4) Marvac Hair Fiber Spray Applicator - Precision
# 5) Marvac Hair Mousse 180ml - Volume & Flexible Hold
# 6) Marvac H+ Super Strong Hold Hair Spray 300ml
# 7) Marvac Black Bob Pins No.6 135g
# 8) Marvac Bob Pins No.4 Black Small 135g
# 9) MARVAC Professional Large Paddle Hair Brush
# 10) Marvac Hair Volumiser - Bun Maker / Matte Texture Powder

processed = []

for idx, p in enumerate(products):
    title = p.get("title", "")
    handle = p.get("handle", "")
    body_html = p.get("body_html", "")
    # Clean HTML description
    clean_desc = re.sub(r'<[^>]+>', ' ', body_html).strip()
    clean_desc = " ".join(clean_desc.split())[:350]
    
    variants = p.get("variants", [])
    first_var = variants[0] if variants else {}
    price_val = float(first_var.get("price", 499.00))
    # Original price / compare at price
    compare_price = float(first_var.get("compare_at_price") or (price_val * 1.11))
    if compare_price <= price_val:
        compare_price = round(price_val * 1.11, 2)
    
    discount_pct = int(round((1 - (price_val / compare_price)) * 100)) if compare_price > price_val else 10
    
    images = [img.get("src") for img in p.get("images", [])]
    img1 = images[0] if images else "/images/hero_podium.png"
    img2 = images[1] if len(images) > 1 else img1
    
    tags = [t.lower() for t in p.get("tags", [])]
    product_type = p.get("product_type", "Hair Styling")
    
    is_bestseller = False
    if any(k in title.lower() for k in ["student kit", "strong hold hair spray", "shine hair spray", "fiber spray", "hair mousse", "paddle hair brush", "matte texture powder", "bob pins", "volumiser"]):
        is_bestseller = True
        
    badge = "BESTSELLER" if is_bestseller else ("NEW" if idx % 4 == 0 else "")
    
    # Review count & rating
    rating = 5.0 if idx % 5 != 0 else 4.9
    reviews = 15 + (idx * 3 % 23)
    if "student kit" in title.lower():
        reviews = 16
    elif "h strong hold" in title.lower():
        reviews = 18
    elif "shine hair spray" in title.lower():
        reviews = 20
    elif "fiber spray" in title.lower():
        reviews = 17
    elif "hair mousse" in title.lower():
        reviews = 15
    elif "bob pins no.6" in title.lower():
        reviews = 11
    elif "bob pins no.4" in title.lower():
        reviews = 14
        
    # Map to Hair Goals
    hair_goals = []
    t_lower = title.lower()
    if any(k in t_lower for k in ["spray", "strong hold", "pin", "clip", "hold"]):
        hair_goals.append("HOLD MY STYLE")
    if any(k in t_lower for k in ["mousse", "powder", "volumiser", "volume", "bounce"]):
        hair_goals.append("GIVE ME VOLUME")
    if any(k in t_lower for k in ["detangling", "paddle", "brush", "comb", "smooth"]):
        hair_goals.append("SMOOTH & DETANGLE")
    if any(k in t_lower for k in ["shine", "glossy", "serum", "oil"]):
        hair_goals.append("ADD SHINE")
    if any(k in t_lower for k in ["dummy", "kit", "bun", "extension", "fiber", "lashes"]):
        hair_goals.append("INSTANT HAIR TRANSFORMATION")
        
    if not hair_goals:
        hair_goals.append("HOLD MY STYLE")

    processed.append({
        "id": str(p.get("id", idx)),
        "title": title,
        "handle": handle,
        "price": price_val,
        "originalPrice": compare_price,
        "discountPercent": discount_pct if discount_pct > 0 else 10,
        "rating": rating,
        "reviewsCount": reviews,
        "badge": badge,
        "image": img1,
        "hoverImage": img2,
        "category": product_type or "Hair Styling",
        "hairGoals": hair_goals,
        "description": clean_desc or "Professional grade hair styling solution engineered for effortless salon-quality control, volume, and finish.",
        "isBestseller": is_bestseller,
        "isHotThisWeek": idx < 8
    })

ts_code = f"""export interface Product {{
  id: string;
  title: string;
  handle: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  hoverImage?: string;
  category: string;
  hairGoals: string[];
  description: string;
  isBestseller?: boolean;
  isHotThisWeek?: boolean;
}}

export const products: Product[] = {json.dumps(processed, indent=2)};

export const bestsellers: Product[] = products.filter(p => p.isBestseller).slice(0, 8);
export const hotThisWeek: Product[] = products.filter(p => p.isHotThisWeek).slice(0, 6);
"""

with open("src/data/products.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Generated src/data/products.ts successfully!")
