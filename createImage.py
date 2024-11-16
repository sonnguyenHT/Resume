# import module
from pdf2image import convert_from_path

# Store Pdf with convert_from_path function
images = convert_from_path('resume.pdf')

# clear the read me file
f = open("README.md", "w")
f.write("")
f.close()

for i in range(len(images)):
  
      # Save pages as images in the pdf
    images[i].save('./image/page'+ str(i) +'.jpg', 'JPEG')
    # write to read me file
    f = open("README.md", "a")
    f.write("![page"+str(i)+"](./image/page"+ str(i) +".jpg)\n")