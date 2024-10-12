import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExercise, deleteExercise, updateExerciseDetails } from '../features/exerciseSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const Exercises = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [details, setDetails] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showDetails, setShowDetails] = useState({});
  const exercises = useSelector(state => state.exercises);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedExercises = Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)));
    storedExercises.forEach(exercise => dispatch(addExercise(exercise)));
  }, [dispatch]);

  const handleAddExercise = () => {
    const newExercise = { id: Date.now(), name, duration, calories, details: '' };
    dispatch(addExercise(newExercise));
    localStorage.setItem(newExercise.id, JSON.stringify(newExercise));
    setName('');
    setDuration('');
    setCalories('');
  };

  const handleDeleteExercise = (id) => {
    dispatch(deleteExercise(id));
    localStorage.removeItem(id);
  };

  const handleUpdateDetails = (id) => {
    setSelectedExercise(id);
  };

  const handleSaveDetails = () => {
    dispatch(updateExerciseDetails({ id: selectedExercise, details }));
    const exercise = JSON.parse(localStorage.getItem(selectedExercise));
    exercise.details = details;
    localStorage.setItem(selectedExercise, JSON.stringify(exercise));
    setSelectedExercise(null);
    setDetails('');
  };

  const handleShowDetails = (id) => {
    setShowDetails(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <div className="container">
      <h1>Exercises</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleAddExercise(); }}>
        <input
          type="text"
          placeholder="Exercise Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Calories Burned"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary mb-2">Add Exercise</button>
      </form>
      <ul className="list-group">
        {exercises.map(exercise => (
          <li key={exercise.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{exercise.name}</strong> - {exercise.duration} mins - {exercise.calories} cal
              {showDetails[exercise.id] && exercise.details && <p>Details: {exercise.details}</p>}
            </div>
            <div>
              <button onClick={() => handleDeleteExercise(exercise.id)} className="btn btn-danger me-2">Delete</button>
              <button onClick={() => handleUpdateDetails(exercise.id)} className="btn btn-warning me-2">Add Details</button>
              <button onClick={() => handleShowDetails(exercise.id)} className="btn btn-info">
                {showDetails[exercise.id] ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedExercise && (
        <div className="mt-4">
          <h2>Add Details</h2>
          <textarea
            className="form-control mb-2"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Enter exercise details"
          />
          <button onClick={handleSaveDetails} className="btn btn-success">Save Details</button>
        </div>
      )}
    </div>
  );
};

export default Exercises;
