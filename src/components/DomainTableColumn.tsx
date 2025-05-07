import { Table, Spin, Modal, message, Form } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  useGetDomainsQuery,
  useDeleteDomainMutation,
  useUpdateDomainMutation,
} from "../features/domainApiSlice";
import type { DomainState } from "../types/types";
import { useSelector } from "react-redux";
import { selectFilteredDomains } from "../features/domainSlice";
import { useState } from "react";
import { getDomainTableColumns } from "./DomainTableComponent";

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
  const columns = getDomainTableColumns({
    editingDomain,
    editForm,
    handleUpdate,
    handleSwitchChange,
    handleEdit,
    handleDelete,
    setEditingDomain,
  });

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
