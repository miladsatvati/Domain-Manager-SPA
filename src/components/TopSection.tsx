import React from "react";
import { Typography } from "antd";

const TopSection = () => {
  return (
    <div className="p-6 w-full">
      <Typography.Title
        level={1}
        style={{ textAlign: "left", fontWeight: "300" }}
      >
        Domains
      </Typography.Title>
    </div>
  );
};

export default TopSection;
