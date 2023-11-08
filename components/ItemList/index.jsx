import React from "react";
import "./styles.css";

const ItemList = ({title, link}) => {
  return (
    <div className="item-list">
      <strong>{title}</strong>
      <p>Link: <a href={link} target="_blank" rel="noreferrer noopener">{link}</a></p>
      <hr />
    </div>
  );
};

export default ItemList;
