import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCafes } from "../../redux/cafesSlice";
import { deleteCafeApi } from "../../api/cafes_api";
import { Link } from "react-router-dom";

// each row edit and delete button
const ActionsRenderer = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = () => {
    const editCafeId = props.data.cafe_id;
    navigate(`/edit-cafe?${editCafeId}`, { state: props.data });
  };

  const [deleting, setDeleting] = useState(false);
  // delete button
  const handleDelete = async () => {
    // Logic for deleting the row
    setDeleting(true);
    const cafe_id = props.data.cafe_id;
    if (
      window.confirm(
        "Are you sure you want to delete this cafe and all the employees?"
      )
    ) {
      try {
        // delete cafe in db
        await deleteCafeApi(cafe_id);
        // fetch cafes again
        dispatch(fetchCafes());
      } catch (error) {
        console.error("Error deleting cafe:", error);
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

function LinkRenderer(props) {
  const employeesNumber = props.data.employees;
  return (
    <Link to={`/employees?cafe_id=${props.data.cafe_id}`}>
      {employeesNumber + " people"}
    </Link>
  );
}

const columnDefs = [
  {
    headerName: "Cafe Logo",
    field: "logo",
    width: "120px",
  },
  {
    headerName: "Cafe name",
    field: "cafe_name",
    filter: "agTextColumnFilter",
    sortable: true,
    resizable: true,
    width: "140px",
  },
  {
    headerName: "Cafe Description",
    field: "description",
    resizable: true,
    width: "340px",
  },
  {
    headerName: "Employees",
    field: "employees",
    // valueFormatter: function (params) {
    //   return params.value + " people";
    // },
    cellRenderer: LinkRenderer,
    // cellRendererParams: {
    //   cafe_id:
    // }
    sortable: true,
    resizable: true,
    width: "105px",
  },

  {
    headerName: "Location",
    field: "location",
    filter: "agTextColumnFilter",
    sortable: true,
    resizable: true,
    width: "120px",
  },

  {
    headerName: "Actions",
    cellRenderer: ActionsRenderer,
    colId: "actions",
    width: "230px",
  },
];

export default function CafesContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCafes());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleAddCafe = () => {
    navigate("/edit-cafe");
  };

  const rowData = useSelector((state) => state.cafes);

  return (
    <div className="table-container">
      <div
        className="ag-theme-alpine with-shadow"
        style={{
          height: "350px",
          width: "70%",
          margin: "auto",
          backgroundColor: "#f7eee4",
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
        <Button size="large" variant="contained" onClick={handleAddCafe}>
          Add New Cafe
        </Button>
      </div>
    </div>
  );
}
