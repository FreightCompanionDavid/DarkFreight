```python
import pytesseract
from PIL import Image
import os

class OCRProcessing:
    def __init__(self):
        # Path to the Tesseract executable
        self.tesseract_cmd = os.getenv('TESSERACT_CMD', '/usr/bin/tesseract')
        pytesseract.pytesseract.tesseract_cmd = self.tesseract_cmd

    def process_image(self, image_path):
        """
        Process the image to extract text using OCR.
        
        :param image_path: Path to the image file
        :return: Extracted text from the image
        """
        try:
            image = Image.open(image_path)
            text = pytesseract.image_to_string(image)
            return text
        except Exception as e:
            print(f"Error processing image {image_path}: {e}")
            return None

    def process_images_in_directory(self, directory_path):
        """
        Process all images in a directory to extract text using OCR.
        
        :param directory_path: Path to the directory containing image files
        :return: Dictionary with image file names as keys and extracted text as values
        """
        ocr_results = {}
        try:
            for filename in os.listdir(directory_path):
                if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp', '.gif')):
                    image_path = os.path.join(directory_path, filename)
                    text = self.process_image(image_path)
                    ocr_results[filename] = text
            return ocr_results
        except Exception as e:
            print(f"Error processing directory {directory_path}: {e}")
            return None

# Example usage
if __name__ == "__main__":
    ocr_processor = OCRProcessing()
    result = ocr_processor.process_image('path/to/your/image.png')
    print(result)
```
