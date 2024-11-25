import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleMaterial,
  updateQuantity,
  setMaterials,
  resetMaterials,
} from "../redux/slices/materialStagingSlice";

const sampleRawMaterials = [
  { id: 1, name: "Steel" },
  { id: 2, name: "Wood" },
  { id: 3, name: "Glass" },
  { id: 4, name: "Plastic" },
  { id: 5, name: "Copper" },
  { id: 6, name: "Aluminum" },
  { id: 7, name: "Rubber" },
  { id: 8, name: "Silicon" },
  { id: 9, name: "Gold" },
  { id: 10, name: "Silver" },
];

const TestMaterialStaging  = () => {
  const dispatch = useDispatch();
  const {selectedMaterials} = useSelector(
    (state) => state.materialStagings
  );

  console.log(selectedMaterials);

  const [newMaterials, setNewMaterials] = useState([]);

  const handleToggle = (id) => {
    dispatch(toggleMaterial({ id }));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(quantity, 10) }));
  };

  const handleSetMaterials = () => {
    dispatch(setMaterials(newMaterials));
  };

  const handleReset = () => {
    dispatch(resetMaterials());
  };

  return (
    <div className="my-5">
      <h2 className="text-xl font-bold mb-4">Raw Material Selection Test</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Available Materials:</h3>
        <ul>
          {sampleRawMaterials.map((material) => (
            <li key={material.id} className="flex items-center gap-4">
              <label>
                <input
                  type="checkbox"
                  checked={selectedMaterials.some(
                    (item) => item.id === material.id
                  )}
                  onChange={() => handleToggle(material.id)}
                />
                {material.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Selected Materials:</h3>
        {selectedMaterials.length > 0 ? (
          <ul>
            {selectedMaterials.map((item) => (
              <li key={item.id} className="flex items-center gap-4">
                <span>
                  Material ID: {item.id} - Quantity:{" "}
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                  />
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No materials selected.</p>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Set Predefined Materials:</h3>
        <button
          onClick={() =>
            setNewMaterials([
              { id: 1, quantity: 5 },
              { id: 3, quantity: 2 },
            ])
          }
          className="mr-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Predefined Items
        </button>
        <button
          onClick={handleSetMaterials}
          className="p-2 bg-green-500 text-white rounded"
        >
          Apply
        </button>
      </div>

      <button
        onClick={handleReset}
        className="p-2 bg-red-500 text-white rounded"
      >
        Reset
      </button>
    </div>
  );
};

export default TestMaterialStaging ;
