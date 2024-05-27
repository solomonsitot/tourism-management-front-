import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/features/counter/counterSlice";
function Counting() {
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => dispatch(increment())}>inc</button>
      <button onClick={() => dispatch(decrement())}>dec</button>
    </div>
  );
}

export default Counting;
