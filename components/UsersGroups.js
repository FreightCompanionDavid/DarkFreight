import './UsersGroups.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  addUserGroup,
  deleteUserGroup,
  fetchUserGroups,
} from '../store/actions';

const UsersGroups = () => {
  const dispatch = useDispatch();
  const userGroups = useSelector(state => state.userGroups);
  const [newGroupName, setNewGroupName] = useState('');

  useEffect(() => {
    dispatch(fetchUserGroups());
  }, [dispatch]);

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      dispatch(addUserGroup(newGroupName));
      setNewGroupName('');
    }
  };

  const handleDeleteGroup = (groupId) => {
    dispatch(deleteUserGroup(groupId));
  };

  return (
    <div className="users-groups">
      <h2>User Groups</h2>
      <div className="add-group">
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="New group name"
        />
        <button onClick={handleAddGroup}>Add Group</button>
      </div>
      <ul className="group-list">
        {userGroups.map(group => (
          <li key={group.id}>
            {group.name}
            <button onClick={() => handleDeleteGroup(group.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersGroups;
