import type { ColumnsType } from "antd/es/table";
import type { DomainState } from "../types/types";
import { Tag, Switch, Form, Input, Button, Space, type FormInstance } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React from "react";

interface ColumnHelpers {
  editingDomain: DomainState | null;
  editForm: FormInstance;
  handleUpdate: () => void;
  handleSwitchChange: (checked: boolean) => void;
  handleEdit: (domain: DomainState) => void;
  handleDelete: (id: string) => void;
  setEditingDomain: React.Dispatch<React.SetStateAction<DomainState | null>>;
}

export const getDomainTableColumns = ({
  editingDomain,
  editForm,
  handleUpdate,
  handleSwitchChange,
  handleEdit,
  handleDelete,
  setEditingDomain
}: ColumnHelpers): ColumnsType<DomainState> => [
  {
    title: "Domain URL",
    dataIndex: "domain",
    key: "domain",
    responsive: ["xs", "sm", "md", "lg"],
    render: (text: string, record: DomainState) => {
      if (editingDomain?.id === record.id) {
        return (
          <Form form={editForm}>
            <Form.Item
              name="domain"
              rules={[
                { required: true, message: "Please input domain URL" },
                {
                  pattern:
                    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/\S*)?$/,
                  message: "Please enter a valid domain URL",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        );
      }
      return <span style={{ wordBreak: "break-word" }}>{text}</span>;
    },
  },
  {
    title: "Active",
    dataIndex: "isActive",
    key: "isActive",
    responsive: ["xs", "sm", "md", "lg"],
    render: (active: boolean, record: DomainState) => {
      if (editingDomain?.id === record.id) {
        return (
          <Form form={editForm}>
            <Form.Item name="isActive" valuePropName="checked">
              <Switch onChange={handleSwitchChange} />
            </Form.Item>
          </Form>
        );
      }
      return <Switch checked={active} disabled />;
    },
  },
  {
    title: "Verification Status",
    dataIndex: "status",
    key: "status",
    responsive: ["xs", "sm", "md", "lg"],
    render: (verified: "rejected" | "verified" | "pending") => {
      if (verified === "verified") return <Tag color="green">Verified</Tag>;
      if (verified === "rejected") return <Tag color="red">Rejected</Tag>;
      return <Tag color="orange">Pending</Tag>;
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record: DomainState) => (
      <Space>
        {editingDomain?.id === record.id ? (
          <>
            <Button type="link" onClick={handleUpdate}>
              Save
            </Button>
            <Button 
              type="link" 
              danger 
              onClick={() => setEditingDomain(null)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              icon={<EditOutlined />}
              type="link"
              onClick={() => handleEdit(record)}
            >
              Edit
            </Button>
            <Button
              icon={<DeleteOutlined />}
              type="link"
              danger
              onClick={() => handleDelete(record.id)}
            >
              Delete
            </Button>
          </>
        )}
      </Space>
    ),
  },
];