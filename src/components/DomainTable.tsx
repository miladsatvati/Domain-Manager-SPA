import {
  Table,
  Switch,
  Tag,
  Button,
  Space,
  Spin,
  Modal,
  message,
  Form,
  Input,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  useGetDomainsQuery,
  useDeleteDomainMutation,
  useUpdateDomainMutation,
} from "../features/domainApiSlice";
import type { DomainState } from "../types/types";
import { useSelector } from "react-redux";
import { selectFilteredDomains } from "../features/domainSlice";
import { useState } from "react";

const DomainTable = () => {
  const { data, isLoading, error } = useGetDomainsQuery();
  const [deleteDomain] = useDeleteDomainMutation();
  const [updateDomain] = useUpdateDomainMutation();
  const searchTerm = useSelector(selectFilteredDomains);
  const [modal, contextHolder] = Modal.useModal();
  const [editingDomain, setEditingDomain] = useState<DomainState | null>(null);
  const [editForm] = Form.useForm();

  const filteredDomains = searchTerm
    ? data?.filter((domain) =>
        domain.domain.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  const handleDelete = (id: string) => {
    modal.confirm({
      title: "Delete Domain",
      content: "Are you sure you want to delete this domain?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteDomain(id).unwrap();
          message.success("Domain deleted successfully");
        } catch (err) {
          message.error("Failed to delete domain");
          console.error("Failed to delete domain:", err);
        }
      },
    });
  };

  const handleUpdate = async () => {
    try {
      const values = await editForm.validateFields();
      if (editingDomain) {
        await updateDomain({
          id: editingDomain.id,
          patch: {
            domain: values.domain,
            isActive: values.isActive,
          },
        }).unwrap();
        message.success("Domain updated successfully");
        setEditingDomain(null);
      }
    } catch (err) {
      message.error("Failed to update domain");
      console.error("Failed to update domain:", err);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    editForm.setFieldsValue({ isActive: checked });
  };

  const handleEdit = (domain: DomainState) => {
    setEditingDomain(domain);
    editForm.setFieldsValue({
      domain: domain.domain,
      isActive: domain.isActive,
    });
  };

  if (isLoading) {
    return (
      <div className="loading-error">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }
  if (error) {
    return (
      <div className="loading-error">
        <h1 className="text-2xl text-red-500">
          Error:{" "}
          {"message" in error ? error.message : "An unknown error occurred"}
        </h1>
      </div>
    );
  }

  const columns: ColumnsType<DomainState> = [
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
        const getTag = () => {
          if (verified === "verified") {
            return <Tag color="green">Verified</Tag>;
          } else if (verified === "rejected") {
            return <Tag color="red">rejected</Tag>;
          } else {
            return <Tag color="orange">pending</Tag>;
          }
        };
        return getTag();
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
              <Button type="link" danger onClick={() => setEditingDomain(null)}>
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

  return (
    <div className="p-12">
      {contextHolder}
      <Table<DomainState>
        dataSource={filteredDomains}
        rowKey={(record) => record.id}
        columns={columns}
        pagination={{ pageSize: 9, position: ["bottomCenter"] }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default DomainTable;
