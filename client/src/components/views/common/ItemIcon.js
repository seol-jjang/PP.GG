import React, { useEffect, useState } from "react";
import "../../../styles/iconStyle/itemIcon.scss";

const ItemIcon = ({ stats }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (stats) {
      for (let i = 0; i < 6; i++) {
        const item = "item" + i;
        setItems((items) => [...items, stats[item]]);
      }
    }
  }, []);

  const renderItem = items.map((item, index) =>
    item === 0 || item >= 7000 ? (
      <span className="item-bg" key={index}></span>
    ) : (
      <span className="item-bg" key={index}>
        <img
          src={`${process.env.REACT_APP_DATA_API}/img/item/${item}.png`}
          alt={`item_${item}`}
        />
      </span>
    )
  );

  return <>{renderItem}</>;
};

export default ItemIcon;
