import cv2
import os

scratch_dir = r"C:\Users\hp\.gemini\antigravity-ide\brain\f3b63174-873f-4343-a4de-29137a39be9a\scratch"
frames_dir = os.path.join(scratch_dir, "extracted_frames")

f40 = cv2.imread(os.path.join(frames_dir, "f_40_75s.jpg"))
f43 = cv2.imread(os.path.join(frames_dir, "f_43_81s.jpg"))

h, w, _ = f40.shape
# In f40:
# Neha: x 0.05 to 0.13, y 0.43 to 0.67
# Vaishnavi: x 0.24 to 0.32, y 0.43 to 0.67
# Sahana: x 0.43 to 0.53, y 0.43 to 0.67
# Tanushree: x 0.62 to 0.73, y 0.43 to 0.67
# Chandana: x 0.82 to 0.92, y 0.43 to 0.67

people = [
    ("neha", int(w * 0.055), int(w * 0.13), 0.43, 0.67),
    ("vaishnavi", int(w * 0.245), int(w * 0.32), 0.43, 0.67),
    ("sahana", int(w * 0.435), int(w * 0.53), 0.43, 0.67),
    ("tanushree", int(w * 0.625), int(w * 0.73), 0.43, 0.67),
    ("chandana", int(w * 0.82), int(w * 0.92), 0.43, 0.67),
]

for name, x1, x2, y_pct1, y_pct2 in people:
    crop = f40[int(h * y_pct1):int(h * y_pct2), x1:x2]
    cv2.imwrite(f"public/images/person_{name}.png", crop)

# In f43, let's get bhoomi and pooja
if f43 is not None:
    # Bhoomi is around x 0.82 to 0.93 in f43
    bhoomi_crop = f43[int(h * 0.20):int(h * 0.44), int(w * 0.82):int(w * 0.93)]
    cv2.imwrite("public/images/person_bhoomi.png", bhoomi_crop)
    # Pooja is around x 0.52 to 0.61 in f49
    f49 = cv2.imread(os.path.join(frames_dir, "f_49_92s.jpg"))
    if f49 is not None:
        pooja_crop = f49[int(h * 0.46):int(h * 0.67), int(w * 0.52):int(w * 0.61)]
        cv2.imwrite("public/images/person_pooja.png", pooja_crop)

print("Saved individual customer cutouts")
