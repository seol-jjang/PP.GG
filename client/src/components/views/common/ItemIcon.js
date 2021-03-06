import React, { useEffect, useState } from "react";

const ItemIcon = ({ stats }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (stats) {
      for (let i = 0; i < 6; i++) {
        const item = "item" + i;
        setItems((items) => [...items, stats[item]]);
      }
    }
  }, [stats]);

  const renderItem = items.map((item, index) =>
    item !== 0 ? (
      <span className="item-bg" key={index}>
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/item/${item}.png`}
          alt="img"
        />
      </span>
    ) : (
      <span className="item-bg" key={index}></span>
    )
  );

  return <>{renderItem}</>;
};

export default ItemIcon;
