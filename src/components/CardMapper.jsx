import React from "react";
function CardMapper(props) {
  const OBJECT = props.OBJECT;
  const IMAGE = props.IMAGE;
  const H5 = props.H5;
  const BoH = props.BoH;
  const P = props.P;
  const SPAN = props.SPAN;
  // const PARAM4 = props.param4;
  return (
    <>
      {OBJECT.map((obj, index) => (
        <div key={obj.id} className={`card custom-card ${props.cols}`}>
          <img
            className="card-img"
            src={`http://localhost:8000/${BoH}/${obj[IMAGE]}`}
            alt=""
          />
          <span className="text-sm text-right">{obj[SPAN]}</span>
          <h5>{obj[H5]}</h5>
          <p>{obj[P] }</p>
        </div>
      ))}
    </>
  );
}

export default CardMapper;
