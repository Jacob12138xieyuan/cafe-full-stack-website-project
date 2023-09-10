import React from "react";
import Title from "../../components/Title";
import CafesForm from "./CafesForm";

export default function CafesEditPage() {
  const title = "Add/Edit Cafe";
  const description = `You can Add or Edit a Cafe's information.`;
  return (
    <div>
      <Title title={title} description={description} />
      <CafesForm />
    </div>
  );
}
