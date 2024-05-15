import requests
import json
import logging
from backend.services.ocrService import OCRService
from backend.services.blockchainService import BlockchainService
from backend.ai.error_detection import ErrorDetection

class EDIComCenter:
    def __init__(self):
        self.ocr_service = OCRService()
        self.blockchain_service = BlockchainService()
        self.error_detection = ErrorDetection()
        self.api_url = "https://edi.example.com/api"
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.get_api_key()}"
        }
        logging.basicConfig(level=logging.INFO)

    def get_api_key(self):
        # Fetch the API key from environment variables or a secure vault
        return os.getenv("EDI_API_KEY")

    def send_edi_message(self, message):
        try:
            response = requests.post(f"{self.api_url}/send", headers=self.headers, data=json.dumps(message))
            response.raise_for_status()
            logging.info(f"EDI message sent successfully: {response.json()}")
            return response.json()
        except requests.exceptions.RequestException as e:
            logging.error(f"Failed to send EDI message: {e}")
            self.error_detection.log_error(e)
            return None

    def receive_edi_message(self):
        try:
            response = requests.get(f"{self.api_url}/receive", headers=self.headers)
            response.raise_for_status()
            edi_message = response.json()
            logging.info(f"EDI message received: {edi_message}")
            return edi_message
        except requests.exceptions.RequestException as e:
            logging.error(f"Failed to receive EDI message: {e}")
            self.error_detection.log_error(e)
            return None

    def process_edi_message(self, edi_message):
        try:
            # Process the EDI message using OCR and Blockchain services
            document_data = self.ocr_service.process_document(edi_message['document'])
            blockchain_response = self.blockchain_service.record_transaction(document_data)
            logging.info(f"Processed EDI message: {blockchain_response}")
            return blockchain_response
        except Exception as e:
            logging.error(f"Failed to process EDI message: {e}")
            self.error_detection.log_error(e)
            return None

# Example usage
if __name__ == "__main__":
    edi_com_center = EDIComCenter()
    message = {
        "document": "path/to/document.pdf",
        "metadata": {
            "shipment_id": "12345",
            "sender": "Company A",
            "receiver": "Company B"
        }
    }
    edi_com_center.send_edi_message(message)
    received_message = edi_com_center.receive_edi_message()
    if received_message:
        edi_com_center.process_edi_message(received_message)
