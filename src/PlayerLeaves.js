import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPagelines } from "@fortawesome/free-brands-svg-icons";

function Leaf({
  number,
  value,
  onClick,
  emptyColor,
  filledColor,
  size,
  clickable
}) {
  function handleClick() {
    if(clickable) {
      onClick(number === value ? 0 : number);
    }
  }

  return (
    <span
      className={clickable ? "clickable" : undefined}
      onClick={handleClick}
      data-testid={`leaf-${number}`}
    >
      <FontAwesomeIcon
        icon={faPagelines}
        color={number <= value ? filledColor : emptyColor}
        size={size}
        data-testid={"leaf-is-filled-" + (number <= value ? "1" : "0")}
        className={(number <= value ? "filled" : "empty") + "-leaf"}
      />
    </span>
  );
}

export default function PlayerLeaves(props) {
  const {
    className,
    value,
    onClick = () => {},
    clickable = true,
    emptyColor = "#bbb",
    filledColor = "green",
    size = "1x",
    leafCount = 4
  } = props;

  return (
    <span className={className}>
      {[...Array(leafCount).keys()].map(position => {
        return (
          <Leaf
            emptyColor={emptyColor}
            filledColor={filledColor}
            clickable={clickable}
            size={size}
            number={position + 1}
            value={value}
            key={position}
            onClick={onClick}
          />
        );
      })}
    </span>
  );
}
