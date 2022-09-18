import { useEffect, useState } from "react";
import "./App.css";
import { BedTimes } from "./components/BedTimes";
import { FormError } from "./components/FormError";
import { Header } from "./components/Header";
import { NowTimes } from "./components/NowTimes";
import { Question } from "./components/Question";
import { TimeForm } from "./components/TimeForm";
import { useSpaceCanvas } from "./hooks/useSpaceCanvas/useSpaceCanvas";

export function App() {
  const { canvasRef } = useSpaceCanvas();

  return (
    <>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasRef}
      ></canvas>
      <div className="App">
        <div>App</div>
        <Header />
        <Question />
        {false && <FormError /> /* TODO: Add dynamic state */}
        <TimeForm />
        <BedTimes />
        <NowTimes />
      </div>
    </>
  );
}
