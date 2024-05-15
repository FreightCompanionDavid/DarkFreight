import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import joblib
import os

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Database connection
from backend.config.database import connectDB
from backend.models.shipment import Shipment

# Connect to the database
connectDB()

class FinancialForecasting:
    def __init__(self):
        self.model = None
        self.load_model()

    def load_model(self):
        model_path = os.getenv("FINANCIAL_FORECAST_MODEL_PATH", "models/financial_forecast_model.pkl")
        if os.path.exists(model_path):
            self.model = joblib.load(model_path)
        else:
            self.model = LinearRegression()

    def save_model(self):
        model_path = os.getenv("FINANCIAL_FORECAST_MODEL_PATH", "models/financial_forecast_model.pkl")
        joblib.dump(self.model, model_path)

    def train_model(self, data):
        # Assuming data is a pandas DataFrame
        X = data.drop(columns=["target"])
        y = data["target"]
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        self.model.fit(X_train, y_train)
        predictions = self.model.predict(X_test)
        mse = mean_squared_error(y_test, predictions)
        
        self.save_model()
        
        return mse

    def predict(self, input_data):
        # Assuming input_data is a pandas DataFrame
        return self.model.predict(input_data)

    def fetch_historical_data(self):
        # Fetch historical shipment data from the database
        shipments = Shipment.find()
        data = []
        for shipment in shipments:
            data.append({
                "feature1": shipment.feature1,
                "feature2": shipment.feature2,
                # Add more features as needed
                "target": shipment.financial_metric  # The target variable to predict
            })
        return pd.DataFrame(data)

# Example usage
if __name__ == "__main__":
    forecasting = FinancialForecasting()
    historical_data = forecasting.fetch_historical_data()
    mse = forecasting.train_model(historical_data)
    print(f"Model trained with MSE: {mse}")

    # Example prediction
    example_data = pd.DataFrame({
        "feature1": [value1],
        "feature2": [value2],
        # Add more features as needed
    })
    prediction = forecasting.predict(example_data)
    print(f"Predicted financial metric: {prediction}")
