// redux/rawMaterialSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedRawMaterialIds: [],
    rawMaterials: []
};

const relationshipSlice = createSlice({
    name: 'rawMaterials',
    initialState,
    reducers: {
        setRawMaterials: (state, action) => {
            // This will be called when you want to set the raw materials initially or update them
            state.rawMaterials = action.payload;
        },
        toggleRawMaterials: (state, action) => {
            const materialId = action.payload;  // Ensure action.payload is a single material ID, not an array

            // Check if the material is already in the selected array
            if (state.selectedRawMaterialIds.includes(materialId)) {
              // If it's already selected, remove it from the array
              state.selectedRawMaterialIds = state.selectedRawMaterialIds.filter(id => id !== materialId);
            } else {
              // If it's not selected, add it to the array
              state.selectedRawMaterialIds.push(materialId);
            }
          },          
          setSelectedRawMaterials: (state, action) => {
            // Loop through incoming IDs and toggle their presence in the selectedRawMaterialIds
            const newIds = action.payload;
            newIds.forEach((id) => {
              if (state.selectedRawMaterialIds.includes(id)) {
                // If ID is already in the list, remove it
                state.selectedRawMaterialIds = state.selectedRawMaterialIds.filter(
                  (existingId) => existingId !== id
                );
              } else {
                // If ID is not in the list, add it
                state.selectedRawMaterialIds.push(id);
              }
            });
          
            // Update rawMaterials based on the updated selectedRawMaterialIds
            state.rawMaterials = state.rawMaterials.filter((material) =>
              state.selectedRawMaterialIds.includes(material.id)
            );
          },
                
    }
});

export const { setRawMaterials, toggleRawMaterial, setSelectedRawMaterials } = relationshipSlice.actions;
export default relationshipSlice.reducer;
