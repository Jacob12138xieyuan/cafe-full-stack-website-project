import React from "react";
import Title from "../../components/Title";

export default function NotFoundPage() {
  const title = "404 - Page Not Found";
  const description = "The page you are looking for does not exist.";
  return (
    <div>
      <Title title={title} description={description} />
    </div>
  );
}
