import os
import requests
from requests.auth import HTTPBasicAuth

class QuickBooksIntegration:
    def __init__(self):
        self.base_url = "https://quickbooks.api.intuit.com/v3/company"
        self.company_id = os.environ.get("QUICKBOOKS_COMPANY_ID")
        self.client_id = os.environ.get("QUICKBOOKS_CLIENT_ID")
        self.client_secret = os.environ.get("QUICKBOOKS_CLIENT_SECRET")
        self.access_token = os.environ.get("QUICKBOOKS_ACCESS_TOKEN")

    def get_headers(self):
        return {
            "Authorization": f"Bearer {self.access_token}",
            "Accept": "application/json",
            "Content-Type": "application/json"
        }

    def get_company_info(self):
        url = f"{self.base_url}/{self.company_id}/companyinfo/{self.company_id}"
        response = requests.get(url, headers=self.get_headers())
        response.raise_for_status()
        return response.json()

    def create_invoice(self, invoice_data):
        url = f"{self.base_url}/{self.company_id}/invoice"
        response = requests.post(url, headers=self.get_headers(), json=invoice_data)
        response.raise_for_status()
        return response.json()

    def get_invoice(self, invoice_id):
        url = f"{self.base_url}/{self.company_id}/invoice/{invoice_id}"
        response = requests.get(url, headers=self.get_headers())
        response.raise_for_status()
        return response.json()

    def update_invoice(self, invoice_id, update_data):
        url = f"{self.base_url}/{self.company_id}/invoice/{invoice_id}"
        response = requests.put(url, headers=self.get_headers(), json=update_data)
        response.raise_for_status()
        return response.json()

    def delete_invoice(self, invoice_id):
        url = f"{self.base_url}/{self.company_id}/invoice/{invoice_id}?operation=delete"
        response = requests.post(url, headers=self.get_headers())
        response.raise_for_status()
        return response.json()

# Example usage
if __name__ == "__main__":
    qb = QuickBooksIntegration()
    try:
        company_info = qb.get_company_info()
        print("Company Info:", company_info)
    except requests.exceptions.HTTPError as err:
        print(f"Error: {err}")
