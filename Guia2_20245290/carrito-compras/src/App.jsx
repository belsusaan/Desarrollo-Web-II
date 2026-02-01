import React, { useState } from "react";
import { Header } from "./components/header";
import { Footer } from "./components/Footer";
import { Guittar } from "./components/Guittar";
import { db } from "./data/db";

export const App = () => {
  const [data, setData] = useState(db);
  console.log(data);
  return (
    <>
      <Header />
      <main class="container-xl mt-5">
        <h2 class="text-center">Nuestra Colección</h2>

        <div class="row mt-5">
          <Guittar nombre="Guitarra 1" />
          <Guittar nombre="Guitarra 2" />
          <Guittar nombre="Guitarra 3" />
        </div>
      </main>
      <Footer />
    </>
  );
};
