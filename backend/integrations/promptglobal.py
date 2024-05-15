import os
import requests

class PromptGlobalIntegration:
    def __init__(self):
        self.api_key = os.environ.get("PROMPTGLOBAL_API_KEY")
        self.base_url = "https://api.promptglobal.com/v1"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

    def get_shipment_data(self, shipment_id):
        url = f"{self.base_url}/shipments/{shipment_id}"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()

    def update_shipment_status(self, shipment_id, status):
        url = f"{self.base_url}/shipments/{shipment_id}/status"
        payload = {"status": status}
        response = requests.put(url, headers=self.headers, json=payload)
        response.raise_for_status()
        return response.json()

    def create_shipment(self, shipment_data):
        url = f"{self.base_url}/shipments"
        response = requests.post(url, headers=self.headers, json=shipment_data)
        response.raise_for_status()
        return response.json()

    def delete_shipment(self, shipment_id):
        url = f"{self.base_url}/shipments/{shipment_id}"
        response = requests.delete(url, headers=self.headers)
        response.raise_for_status()
        return response.json()

# Example usage
if __name__ == "__main__":
    prompt_global = PromptGlobalIntegration()
    try:
        # Fetch shipment data
        shipment_data = prompt_global.get_shipment_data("shipment_id_example")
        print("Shipment Data:", shipment_data)

        # Update shipment status
        updated_status = prompt_global.update_shipment_status("shipment_id_example", "Delivered")
        print("Updated Status:", updated_status)

        # Create a new shipment
        new_shipment = {
            "origin": "New York",
            "destination": "Los Angeles",
            "weight": 100,
            "description": "Electronics"
        }
        created_shipment = prompt_global.create_shipment(new_shipment)
        print("Created Shipment:", created_shipment)

        # Delete a shipment
        deleted_shipment = prompt_global.delete_shipment("shipment_id_example")
        print("Deleted Shipment:", deleted_shipment)

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
