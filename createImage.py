import glob
import os
from pdf2image import convert_from_path

os.makedirs('image', exist_ok=True)
for old_file in glob.glob('image/page*.jpg'):
    try:
        os.remove(old_file)
    except OSError:
        pass

images = convert_from_path('resume.pdf')

with open("README.md", "w") as f:
    for i, image in enumerate(images):
        image.save(f'./image/page{i}.jpg', 'JPEG')
        f.write(f"![page{i}](./image/page{i}.jpg)\n")
