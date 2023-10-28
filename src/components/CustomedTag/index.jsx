import { Tag, theme } from "antd";
import React from "react";

function CustomedTag({
  children,
  entity,
  entityType,
  size = "normal",
  ...restProps
}) {
  const { token } = theme.useToken();
  let color, backgroundColor;

  let fontSize = 20;
  switch (size) {
    case "small":
      fontSize = 18;
      break;
    case "large":
      fontSize = 22;
      break;
  }

  const borderRadius = entityType === "zone" ? false : 50;

  if (entityType === "zone") {
    switch (entity) {
      case "A":
        color = token["purple"];
        backgroundColor = token["purple2"];
        break;
      case "B":
        color = token["magenta"];
        backgroundColor = token["magenta2"];
        break;
      case "C":
        color = token["orange7"];
        backgroundColor = token["orange2"];
        break;
    }
  } else {
    switch (entity) {
      case "in":
        break;
      case "out":
        break;
    }
  }

  return (
    <Tag {...restProps} style={{ color, backgroundColor, fontSize, padding: '1px 8px' }}>
      {children}
    </Tag>
  );
}

export default CustomedTag;
