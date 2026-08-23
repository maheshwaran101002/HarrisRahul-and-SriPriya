import fitz
import os

pdf_path = r"d:\marriage website\public\assets\Harris weds Sripriya - Padding 8 (Frame Type).pdf"
doc = fitz.open(pdf_path)

page = doc[2]
image_list = page.get_images(full=True)

for i, img in enumerate(image_list):
    xref = img[0]
    base_image = doc.extract_image(xref)
    image_bytes = base_image["image"]
    image_ext = base_image["ext"]
    with open(rf"d:\marriage website\public\assets\wedding\ring_photo_{i}.{image_ext}", "wb") as f:
        f.write(image_bytes)
