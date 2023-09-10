import axios from "axios";
import config from "../config";

export const addEmployeeApi = async (employee) => {
  console.log(`Adding new employee ${JSON.stringify(employee)}`);
  try {
    // Make a POST request to the /employees endpoint with the updated employee data
    await axios.post(`${config.apiUrl}/employees`, employee);
    console.log("add an employee in the database");
  } catch (error) {
    // Handle any errors that occurred during the database update
    console.log("Error updating employee in the database:", error);
    throw error; // Rethrow the error to be handled elsewhere if needed
  }
};

export const editEmployeeApi = async (employee) => {
  console.log(`Editing existing employee ${JSON.stringify(employee)}`);
  try {
    // Make a POST request to the /employees endpoint with the updated employee data
    await axios.put(`${config.apiUrl}/employees`, employee);
    console.log("Edited an employee in the database");
  } catch (error) {
    // Handle any errors that occurred during the database update
    console.log("Error updating employee in the database:", error);
    throw error; // Rethrow the error to be handled elsewhere if needed
  }
};

export const deleteEmployeeApi = async (employeeId) => {
  console.log(`Deleting employee with ID ${employeeId}`);
  try {
    // Make a DELETE request to the /employees/:id endpoint with the employee ID
    await axios.delete(`${config.apiUrl}/employees/${employeeId}`);
    console.log(`Deleted employee with ID ${employeeId} from the database`);
  } catch (error) {
    // Handle any errors that occurred during the deletion
    console.log("Error deleting employee from the database:", error);
    throw error; // Rethrow the error to be handled elsewhere if needed
  }
};
