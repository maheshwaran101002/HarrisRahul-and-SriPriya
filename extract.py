import fitz
import io
from PIL import Image
import os

pdf_path = "Harris weds Sripriya - Padding 8 (Frame Type).pdf"
out_dir = "public/assets/extracted"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)

for i in range(len(doc)):
    page = doc.load_page(i)
    images = page.get_images(full=True)
    
    for img_index, img in enumerate(images):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        image = Image.open(io.BytesIO(image_bytes))
        image.save(os.path.join(out_dir, f"page_{i}_img_{img_index}.{image_ext}"))
        print(f"Extracted page_{i}_img_{img_index}.{image_ext}")
