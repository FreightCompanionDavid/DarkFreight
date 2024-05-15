import os
import requests

class CargoWiseIntegration:
    def __init__(self):
        self.api_key = os.environ.get("CARGOWISE_API_KEY")
        self.base_url = os.environ.get("CARGOWISE_BASE_URL")
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

    def get_shipment_details(self, shipment_id):
        url = f"{self.base_url}/shipments/{shipment_id}"
        response = requests.get(url, headers=self.headers)
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()

    def create_shipment(self, shipment_data):
        url = f"{self.base_url}/shipments"
        response = requests.post(url, headers=self.headers, json=shipment_data)
        if response.status_code == 201:
            return response.json()
        else:
            response.raise_for_status()

    def update_shipment(self, shipment_id, shipment_data):
        url = f"{self.base_url}/shipments/{shipment_id}"
        response = requests.put(url, headers=self.headers, json=shipment_data)
        if response.status_code == 200:
            return response.json()
        else:
            response.raise_for_status()

    def delete_shipment(self, shipment_id):
        url = f"{self.base_url}/shipments/{shipment_id}"
        response = requests.delete(url, headers=self.headers)
        if response.status_code == 204:
            return {"message": "Shipment deleted successfully"}
        else:
            response.raise_for_status()

# Example usage:
# cargowise = CargoWiseIntegration()
# shipment_details = cargowise.get_shipment_details("shipment_id")
# print(shipment_details)
