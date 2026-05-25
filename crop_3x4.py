"""Crop a source photo to a 3:4 (width:height) portrait ID-style photo.

Tries to use OpenCV face detection (if available) to center the crop on
the face. Falls back to a manual ratio.
"""

from PIL import Image

SRC = "image/image.png"
DST = "image/sonnguyen_3x4.jpeg"

img = Image.open(SRC)
w, h = img.size
print("source:", w, h)

face_box = None
try:
    import cv2
    import numpy as np
    cascade_path = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    cascade = cv2.CascadeClassifier(cascade_path)
    arr = np.array(img.convert("RGB"))
    gray = cv2.cvtColor(arr, cv2.COLOR_RGB2GRAY)
    faces = cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(120, 120))
    if len(faces) > 0:
        faces = sorted(faces, key=lambda b: b[2] * b[3], reverse=True)
        face_box = tuple(int(v) for v in faces[0])
        print("detected face:", face_box)
except Exception as e:
    print("face detection skipped:", e)

if face_box is not None:
    fx, fy, fw, fh = face_box
    face_cx = fx + fw // 2
    face_cy = fy + fh // 2

    face_height_ratio = 0.62
    frame_h = int(fh / face_height_ratio)
    frame_w = int(frame_h * 3 / 4)

    top = fy - int(frame_h * 0.18)
    if top < 0:
        top = 0
    bottom = top + frame_h
    if bottom > h:
        bottom = h
        top = bottom - frame_h
        if top < 0:
            top = 0
            frame_h = bottom - top
            frame_w = int(frame_h * 3 / 4)

    left = face_cx - frame_w // 2
    if left < 0:
        left = 0
    right = left + frame_w
    if right > w:
        right = w
        left = right - frame_w
else:
    frame_h = int(h * 0.92)
    frame_w = int(frame_h * 3 / 4)
    top = int(h * 0.04)
    bottom = top + frame_h
    left = max(0, w // 2 - frame_w // 2)
    right = left + frame_w

print("crop box:", (left, top, right, bottom), "size:", (right - left, bottom - top))
cropped = img.crop((left, top, right, bottom))

final = cropped.resize((600, 800), Image.LANCZOS)
final.save(DST, "JPEG", quality=92)
print(f"Saved {DST}: {final.size}")
