import os
import pytesseract
from PIL import Image
from backend.services.ocrService import process_image
from backend.models.document import Document
from backend.config.database import connectDB

# Initialize database connection
connectDB()

class DocumentAutomation:
    def __init__(self):
        self.ocr_path = os.getenv('TESSERACT_PATH', '/usr/bin/tesseract')
        pytesseract.pytesseract.tesseract_cmd = self.ocr_path

    def scan_and_digitize(self, image_path):
        """
        Scan and digitize the document using OCR.
        :param image_path: Path to the image file.
        :return: Extracted text from the image.
        """
        try:
            image = Image.open(image_path)
            text = pytesseract.image_to_string(image)
            return text
        except Exception as e:
            print(f"Error processing image {image_path}: {e}")
            return None

    def save_document(self, text, metadata):
        """
        Save the digitized document to the database.
        :param text: Extracted text from the document.
        :param metadata: Additional metadata for the document.
        :return: Document object.
        """
        try:
            document = Document(text=text, metadata=metadata)
            document.save()
            return document
        except Exception as e:
            print(f"Error saving document: {e}")
            return None

    def automate_document_processing(self, image_path, metadata):
        """
        Automate the entire document processing workflow.
        :param image_path: Path to the image file.
        :param metadata: Additional metadata for the document.
        :return: Document object.
        """
        text = self.scan_and_digitize(image_path)
        if text:
            document = self.save_document(text, metadata)
            return document
        return None

# Example usage
if __name__ == "__main__":
    doc_automation = DocumentAutomation()
    image_path = "path/to/your/image/file.jpg"
    metadata = {"shipment_id": "12345", "type": "invoice"}
    document = doc_automation.automate_document_processing(image_path, metadata)
    if document:
        print(f"Document processed and saved with ID: {document.id}")
    else:
        print("Document processing failed.")
