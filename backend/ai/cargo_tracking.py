import requests
import json
from datetime import datetime
from backend.services.blockchainService import record_transaction

class CargoTracking:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.cargotracking.com/v1"

    def get_headers(self):
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

    def track_cargo(self, tracking_number):
        url = f"{self.base_url}/track/{tracking_number}"
        response = requests.get(url, headers=self.get_headers())
        
        if response.status_code == 200:
            tracking_data = response.json()
            self.log_tracking_event(tracking_number, tracking_data)
            return tracking_data
        else:
            response.raise_for_status()

    def log_tracking_event(self, tracking_number, tracking_data):
        event = {
            "tracking_number": tracking_number,
            "status": tracking_data.get("status"),
            "location": tracking_data.get("location"),
            "timestamp": datetime.utcnow().isoformat()
        }
        record_transaction(event)

# Example usage
if __name__ == "__main__":
    api_key = "your_api_key_here"
    tracking_number = "your_tracking_number_here"
    cargo_tracker = CargoTracking(api_key)
    tracking_info = cargo_tracker.track_cargo(tracking_number)
    print(json.dumps(tracking_info, indent=2))
