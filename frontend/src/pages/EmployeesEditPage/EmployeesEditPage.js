import React from "react";
import Title from "../../components/Title";
import EmployeeForm from "./EmployeesForm";

export default function EmployeesEditPage() {
  const title = "Add/Edit Employee";
  const description = `You can Add or Edit an employee's information.`;
  return (
    <div>
      <Title title={title} description={description} />
      <EmployeeForm />
    </div>
  );
}
