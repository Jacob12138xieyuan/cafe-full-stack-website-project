import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Title from "../../components/Title";
import CafesContainer from "./CafesContainer";

export default function CafesPage() {
  const title = "Cafes We Have";
  const description = `Your destination for exquisite brews and exceptional flavors. With
  multiple convenient locations throughout the city, finding us is a
  breeze. Join us in celebrating the art of coffee and let us awaken your
  senses with our passion and quality. Experience Fantastic Coffee today
  and savor the perfect cup.`;
  return (
    <>
      <Title title={title} description={description} />
      <CafesContainer />
    </>
  );
}
