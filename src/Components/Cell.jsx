import React from "react";

const Cell = ({ bclass, state, onClick, idx }) => {
  let style = bclass ? `cell ${bclass}` : `cell`;
  return (
    <span className={style} onClick={() => onClick(idx)}>
      {state}
    </span>
  );
};

export default Cell;
