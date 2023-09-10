import axios from "axios";
import config from "../config";

export const addCafeApi = async (cafe) => {
  console.log(`Adding new cafe`);
  try {
    // Make a POST request to the /cafes endpoint with the updated cafe data
    await axios.post(`${config.apiUrl}/cafes`, cafe);
    console.log("add an cafe in the database");
  } catch (error) {
    // Handle any errors that occurred during the database update
    console.log("Error updating cafe in the database:", error);
    throw error; // Rethrow the error to be handled elsewhere if needed
  }
};

export const editCafeApi = async (cafe) => {
  console.log(`Editing existing cafe id ${cafe.cafe_id}`);
  try {
    // Make a POST request to the /cafes endpoint with the updated cafe data
    await axios.put(`${config.apiUrl}/cafes`, cafe);
    console.log("Edited an cafe in the database");
  } catch (error) {
    // Handle any errors that occurred during the database update
    console.log("Error updating cafe in the database:", error);
    throw error; // Rethrow the error to be handled elsewhere if needed
  }
};

export const deleteCafeApi = async (cafeId) => {
  console.log(`Deleting cafe with ID ${cafeId}`);
  try {
    // Make a DELETE request to the /cafes/:id endpoint with the cafe ID
    await axios.delete(`${config.apiUrl}/cafes/${cafeId}`);
    console.log(`Deleted cafe with ID ${cafeId} from the database`);
  } catch (error) {
    // Handle any errors that occurred during the deletion
    console.log("Error deleting cafe from the database:", error);
    throw error; // Rethrow the error to be handled elsewhere if needed
  }
};
