import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from geopy.distance import geodesic

class RouteOptimizer:
    def __init__(self, locations, num_clusters):
        """
        Initialize the RouteOptimizer with locations and number of clusters.
        
        :param locations: List of tuples containing (latitude, longitude)
        :param num_clusters: Number of clusters for KMeans
        """
        self.locations = locations
        self.num_clusters = num_clusters
        self.model = KMeans(n_clusters=num_clusters)

    def fit(self):
        """
        Fit the KMeans model to the locations.
        """
        self.model.fit(self.locations)
        self.labels = self.model.labels_
        self.centroids = self.model.cluster_centers_

    def get_optimized_routes(self):
        """
        Get the optimized routes based on the fitted model.
        
        :return: List of routes, each route is a list of locations
        """
        routes = [[] for _ in range(self.num_clusters)]
        for idx, label in enumerate(self.labels):
            routes[label].append(self.locations[idx])
        return routes

    def calculate_total_distance(self, route):
        """
        Calculate the total distance of a given route.
        
        :param route: List of tuples containing (latitude, longitude)
        :return: Total distance in kilometers
        """
        total_distance = 0.0
        for i in range(len(route) - 1):
            total_distance += geodesic(route[i], route[i + 1]).kilometers
        return total_distance

    def optimize(self):
        """
        Optimize the routes and calculate the total distance for each route.
        
        :return: Dictionary containing routes and their total distances
        """
        self.fit()
        routes = self.get_optimized_routes()
        optimized_routes = {
            'routes': routes,
            'distances': [self.calculate_total_distance(route) for route in routes]
        }
        return optimized_routes

# Example usage
if __name__ == "__main__":
    locations = [(37.7749, -122.4194), (34.0522, -118.2437), (36.1699, -115.1398), (40.7128, -74.0060)]
    optimizer = RouteOptimizer(locations, num_clusters=2)
    optimized_routes = optimizer.optimize()
    print(optimized_routes)
