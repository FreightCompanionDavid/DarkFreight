import './Fleet.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  addVehicle,
  deleteVehicle,
  fetchFleet,
  updateVehicle,
} from '../store/actions';

const Fleet = () => {
  const dispatch = useDispatch();
  const fleet = useSelector(state => state.fleet);
  const [newVehicle, setNewVehicle] = useState({ make: '', model: '', year: '' });
  const [editingVehicle, setEditingVehicle] = useState(null);

  useEffect(() => {
    dispatch(fetchFleet());
  }, [dispatch]);

  const handleAddVehicle = () => {
    dispatch(addVehicle(newVehicle));
    setNewVehicle({ make: '', model: '', year: '' });
  };

  const handleUpdateVehicle = (vehicle) => {
    dispatch(updateVehicle(vehicle));
    setEditingVehicle(null);
  };

  const handleDeleteVehicle = (vehicleId) => {
    dispatch(deleteVehicle(vehicleId));
  };

  return (
    <div className="fleet-container">
      <h1></h1>
      <div className="fleet-list">
        {fleet.map(vehicle => (
          <div key={vehicle.id} className="fleet-item">
            {editingVehicle === vehicle.id ? (
              <div>
                <input
                  type="text"
                  value={vehicle.make}
                  onChange={(e) => setEditingVehicle({ ...vehicle, make: e.target.value })}
                />
                <input
                  type="text"
                  value={vehicle.model}
                  onChange={(e) => setEditingVehicle({ ...vehicle, model: e.target.value })}
                />
                <input
                  type="text"
                  value={vehicle.year}
                  onChange={(e) => setEditingVehicle({ ...vehicle, year: e.target.value })}
                />
                <button onClick={() => handleUpdateVehicle(editingVehicle)}>Save</button>
              </div>
            ) : (
              <div>
                <span>{vehicle.make} {vehicle.model} ({vehicle.year})</span>
                <button onClick={() => setEditingVehicle(vehicle.id)}>Edit</button>
                <button onClick={() => handleDeleteVehicle(vehicle.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="add-vehicle">
        <h2>Add New Vehicle</h2>
        <input
          type="text"
          placeholder="Make"
          value={newVehicle.make}
          onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
        />
        <input
          type="text"
          placeholder="Model"
          value={newVehicle.model}
          onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
        />
        <input
          type="text"
          placeholder="Year"
          value={newVehicle.year}
          onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
        />
        <button onClick={handleAddVehicle}>Add Vehicle</button>
      </div>
    </div>
  );
};

export default Fleet;
</h1>Fleet Management