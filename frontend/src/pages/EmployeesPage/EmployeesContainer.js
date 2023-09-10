import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from "../../redux/employeesSlice";
import { deleteEmployeeApi } from "../../api/employees_api";
import { useLocation } from "react-router-dom";
// each row edit and delete button
const ActionsRenderer = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // edit button
  const handleEdit = () => {
    const editEmployeeId = props.data.employee_id;
    navigate(`/edit-employee?${editEmployeeId}`, { state: props.data });
  };

  const [deleting, setDeleting] = useState(false);
  // delete button
  const handleDelete = async () => {
    // Logic for deleting the row
    console.log("Delete row:", props.data);
    setDeleting(true);
    const employee_id = props.data.employee_id;
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        // edit employee in db
        await deleteEmployeeApi(employee_id);
        // fetch employees again
        dispatch(fetchEmployees());
      } catch (error) {
        console.error("Error deleting employee:", error);
        throw error;
      }
    }
    setDeleting(false);
  };

  return (
    <div>
      <Button
        size="small"
        variant="contained"
        onClick={handleEdit}
        style={{ marginLeft: "10px", marginRight: "20px" }}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      <Button
        size="small"
        variant="outlined"
        onClick={handleDelete}
        color="error"
        startIcon={<DeleteIcon />}
        disabled={deleting}
      >
        Delete
      </Button>
    </div>
  );
};

const columnDefs = [
  {
    headerName: "Employee Id",
    field: "employee_id",
    width: "130px",
  },
  {
    headerName: "Name",
    field: "name",
    filter: "agTextColumnFilter",
    sortable: true,
    resizable: true,
    width: "120px",
  },
  {
    headerName: "Email",
    field: "email",
    filter: "agTextColumnFilter",
    resizable: true,
    width: "160px",
  },
  {
    headerName: "Phone",
    field: "phone",
    resizable: true,
    width: "120px",
  },
  {
    headerName: "Days worked",
    field: "days_worked",
    valueFormatter: function (params) {
      return params.value + " days";
    },
    sortable: true,
    resizable: true,
    width: "150px",
  },
  {
    headerName: "Cafe name",
    field: "cafe_name",
    filter: "agTextColumnFilter",
    sortable: true,
    resizable: true,
    width: "150px",
  },
  {
    headerName: "Actions",
    cellRenderer: ActionsRenderer,
    colId: "actions",
    width: "230px",
  },
];

export default function EmployeesContainer() {
  const dispatch = useDispatch();

  // filter employees by cafe_id
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterByCafeId = queryParams.get("cafe_id");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleAddEmployee = () => {
    navigate("/edit-employee");
  };

  var rowData = useSelector((state) => state.employees);
  if (filterByCafeId && rowData) {
    rowData = rowData.filter((employee) => employee.cafe_id === filterByCafeId);
  }

  return (
    <div className="table-container">
      <div
        className="ag-theme-alpine with-shadow"
        style={{
          height: "370px",
          width: "70%",
          margin: "auto",
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          animateRows={true}
          cellRenderer={ActionsRenderer}
          sizeColumnsToFit={true}
          suppressRowClickSelection={false}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button size="large" variant="contained" onClick={handleAddEmployee}>
          Add New Employee
        </Button>
      </div>
    </div>
  );
}
