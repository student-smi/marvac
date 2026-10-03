import cv2
import os

scratch_dir = r"C:\Users\hp\.gemini\antigravity-ide\brain\f3b63174-873f-4343-a4de-29137a39be9a\scratch"
frames_dir = os.path.join(scratch_dir, "extracted_frames")
seconds_dir = os.path.join(scratch_dir, "extracted_seconds")
out_dir = r"public\images"
os.makedirs(out_dir, exist_ok=True)

# 1. Hero banner right side product podium
f0 = cv2.imread(os.path.join(frames_dir, "f_00_0s.jpg"))
if f0 is not None:
    h, w, _ = f0.shape
    # Hero product podium: x from 0.50 to 0.98, y from 0.0 to 0.70
    hero_podium = f0[0:int(h * 0.70), int(w * 0.48):int(w * 0.98)]
    cv2.imwrite(os.path.join(out_dir, "hero_podium.png"), hero_podium)
    # Full hero banner area
    hero_full = f0[0:int(h * 0.72), 0:w]
    cv2.imwrite(os.path.join(out_dir, "hero_full_banner.jpg"), hero_full)
    print("Saved hero banner & podium")

# 2. Category blobs from f_06_11s.jpg
f6 = cv2.imread(os.path.join(frames_dir, "f_06_11s.jpg"))
if f6 is not None:
    # 5 categories across width:
    # Y range is roughly 0.45 to 0.85
    h, w, _ = f6.shape
    y1, y2 = int(h * 0.45), int(h * 0.80)
    col_w = w / 5
    cat_names = ["cat_pins", "cat_products", "cat_accessories", "cat_academy", "cat_style_acc"]
    for i, name in enumerate(cat_names):
        x1 = int(i * col_w)
        x2 = int((i + 1) * col_w)
        cat_crop = f6[y1:y2, x1:x2]
        cv2.imwrite(os.path.join(out_dir, f"{name}.png"), cat_crop)
    print("Saved 5 category blobs")

# 3. Combos from f_15_28s.jpg and f_18_34s.jpg
f15 = cv2.imread(os.path.join(frames_dir, "f_15_28s.jpg"))
if f15 is not None:
    h, w, _ = f15.shape
    # Banner area y from 0.28 to 0.88
    combo1 = f15[int(h * 0.28):int(h * 0.89), 0:w]
    cv2.imwrite(os.path.join(out_dir, "combo_banner_999.jpg"), combo1)
    # Just the podium product group
    combo1_podium = f15[int(h * 0.32):int(h * 0.88), int(w * 0.50):w]
    cv2.imwrite(os.path.join(out_dir, "combo_podium_999.png"), combo1_podium)
    print("Saved combo 999 banner")

f18 = cv2.imread(os.path.join(frames_dir, "f_18_34s.jpg"))
if f18 is not None:
    h, w, _ = f18.shape
    combo2 = f18[int(h * 0.17):int(h * 0.77), 0:w]
    cv2.imwrite(os.path.join(out_dir, "combo_banner_1999.jpg"), combo2)
    combo2_podium = f18[int(h * 0.17):int(h * 0.77), int(w * 0.50):w]
    cv2.imwrite(os.path.join(out_dir, "combo_podium_1999.png"), combo2_podium)
    print("Saved combo 1999 banner")

# 4. Build Your Kit 4 kit cards from f_20_37s.jpg
f20 = cv2.imread(os.path.join(frames_dir, "f_20_37s.jpg"))
if f20 is not None:
    h, w, _ = f20.shape
    # 4 cards horizontally
    y1, y2 = int(h * 0.08), int(h * 0.72)
    card_w = int(w * 0.22)
    kit_names = ["kit_sleek_bun", "kit_volume", "kit_bridal", "kit_starter"]
    coords = [
        (int(w * 0.08), int(w * 0.28)),
        (int(w * 0.29), int(w * 0.49)),
        (int(w * 0.50), int(w * 0.70)),
        (int(w * 0.71), int(w * 0.91))
    ]
    for (x1, x2), name in zip(coords, kit_names):
        kit_crop = f20[y1:y2, x1:x2]
        cv2.imwrite(os.path.join(out_dir, f"{name}.jpg"), kit_crop)
    print("Saved 4 kit cards")

# 5. Process products from f_30_56s.jpg & f_33_62s.jpg & sec_58, sec_60, etc.
# In f_30_56s, the product is volumizer tub
f30 = cv2.imread(os.path.join(frames_dir, "f_30_56s.jpg"))
if f30 is not None:
    h, w, _ = f30.shape
    tub = f30[int(h * 0.24):int(h * 0.82), int(w * 0.09):int(w * 0.30)]
    cv2.imwrite(os.path.join(out_dir, "process_01_volumizer.png"), tub)

f33 = cv2.imread(os.path.join(frames_dir, "f_33_62s.jpg"))
if f33 is not None:
    h, w, _ = f33.shape
    spray = f33[int(h * 0.22):int(h * 0.84), int(w * 0.15):int(w * 0.25)]
    cv2.imwrite(os.path.join(out_dir, "process_05_hspray.png"), spray)
    print("Saved process products")

# 6. Brand Logo Transition & Mosaic
f27 = cv2.imread(os.path.join(frames_dir, "f_27_51s.jpg"))
if f27 is not None:
    h, w, _ = f27.shape
    logo_trans = f27[int(h * 0.09):int(h * 0.88), 0:w]
    cv2.imwrite(os.path.join(out_dir, "brand_hero_transition.jpg"), logo_trans)

f28 = cv2.imread(os.path.join(frames_dir, "f_28_52s.jpg"))
if f28 is not None:
    h, w, _ = f28.shape
    mosaic = f28[int(h * 0.09):int(h * 0.90), 0:w]
    cv2.imwrite(os.path.join(out_dir, "mosaic_filmstrip.jpg"), mosaic)
    print("Saved brand assets")

# 7. Shop the Stories from f_36_68s.jpg
f36 = cv2.imread(os.path.join(frames_dir, "f_36_68s.jpg"))
if f36 is not None:
    h, w, _ = f36.shape
    # 5 reel story cards
    story_coords = [
        (int(w * 0.075), int(w * 0.255)),
        (int(w * 0.266), int(w * 0.448)),
        (int(w * 0.457), int(w * 0.638)),
        (int(w * 0.648), int(w * 0.832)),
        (int(w * 0.842), int(w * 0.98))
    ]
    for idx, (x1, x2) in enumerate(story_coords):
        card = f36[int(h * 0.18):int(h * 0.86), x1:x2]
        cv2.imwrite(os.path.join(out_dir, f"story_card_{idx+1}.jpg"), card)
    print("Saved story cards")

# 8. Customer testimonials from f_40_75s.jpg & f_43_81s.jpg
f40 = cv2.imread(os.path.join(frames_dir, "f_40_75s.jpg"))
if f40 is not None:
    h, w, _ = f40.shape
    # Customers: 5 visible in f40
    cust_coords = [
        (int(w * 0.05), int(w * 0.18), "customer_neha"),
        (int(w * 0.19), int(w * 0.37), "customer_vaishnavi"),
        (int(w * 0.38), int(w * 0.57), "customer_sahana"),
        (int(w * 0.58), int(w * 0.77), "customer_tanushree"),
        (int(w * 0.77), int(w * 0.95), "customer_chandana"),
    ]
    for x1, x2, name in cust_coords:
        cust = f40[int(h * 0.42):int(h * 0.95), x1:x2]
        cv2.imwrite(os.path.join(out_dir, f"{name}.jpg"), cust)
    print("Saved customer testimonials 1-5")

f43 = cv2.imread(os.path.join(frames_dir, "f_43_81s.jpg"))
if f43 is not None:
    h, w, _ = f43.shape
    bhoomi = f43[int(h * 0.20):int(h * 0.72), int(w * 0.78):int(w * 0.98)]
    cv2.imwrite(os.path.join(out_dir, "customer_bhoomi.jpg"), bhoomi)
    print("Saved customer testimonial 6")

# 9. Exhibition highlights from f_46_86s.jpg
f46 = cv2.imread(os.path.join(frames_dir, "f_46_86s.jpg"))
if f46 is not None:
    h, w, _ = f46.shape
    # 4 images
    ex_coords = [
        (int(w * 0.05), int(w * 0.265)),
        (int(w * 0.278), int(w * 0.49)),
        (int(w * 0.502), int(w * 0.715)),
        (int(w * 0.726), int(w * 0.94))
    ]
    for idx, (x1, x2) in enumerate(ex_coords):
        ex_img = f46[int(h * 0.20):int(h * 0.79), x1:x2]
        cv2.imwrite(os.path.join(out_dir, f"exhibition_{idx+1}.jpg"), ex_img)
    print("Saved exhibition highlights")

print("All visual assets successfully generated in public/images!")
