import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Typography } from "antd";

const DropDown = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Item 1",
    },
    {
      key: "2",
      label: "Item 2",
    },
    {
      key: "3",
      label: "Item 3",
    },
  ];

  return (
    <div className="w-full flex justify-center border-2 border-gray-200 rounded-md px-2 py-4">
      <Dropdown
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: ["3"],
        }}
      >
        <Typography.Link className="flex w-full justify-between items-center">
          <Space style={{ color: "black", padding: "0px 6px" }}>
            Order by Ascending
          </Space>
          <DownOutlined style={{ color: "black", padding: "0px 6px" }} />
        </Typography.Link>
      </Dropdown>
    </div>
  );
};

export default DropDown;
