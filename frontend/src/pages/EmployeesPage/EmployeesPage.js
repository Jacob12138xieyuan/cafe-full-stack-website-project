import React from "react";
import EmployeesContainer from "./EmployeesContainer";
import Title from "../../components/Title";

const EmployeesPage = () => {
  const title = "Our Employees";
  const description = `Experience Fantastic Coffee with our exceptional team! From skilled
  baristas to friendly staff, our dedicated employees are passionate about
  providing a memorable coffee experience. Come meet our team and savor
  the finest brews at Fantastic Coffee!`;

  return (
    <div>
      <Title title={title} description={description} />
      <EmployeesContainer />
    </div>
  );
};

export default EmployeesPage;
