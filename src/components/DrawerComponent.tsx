import { Drawer, Button, Input, Col, Row } from "antd";
import { useState } from "react";
import { usePostDomainMutation } from "../features/domainApiSlice";

interface DrawerComponentProps {
  onClose: () => void;
  open: boolean;
}

const DrawerComponent = ({ onClose, open }: DrawerComponentProps) => {
  const [domain, setDomain] = useState<string>("");
  const [postDomain, { isLoading }] = usePostDomainMutation();
  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
  };
  const handleAddDomain = () => {
    const domainState = {
      id: new Date().toISOString(),
      domain,
      isActive: false,
      status: "pending" as const,
      createdDate: new Date().toString(),
    };
    postDomain(domainState);
    setDomain("");
    onClose();
  };
  return (
    <Drawer
      title="Add domain"
      placement="right"
      size="large"
      onClose={onClose}
      open={open}
    >
      <Input
        style={{ width: "80%", padding: "1rem 1.5rem" }}
        placeholder="EX:https://www.bridged.media"
        value={domain}
        onChange={handleDomainChange}
      />
      <Row gutter={12} align="bottom" justify="end" className="h-[93%]">
        <Col xs={8} span={6}>
          <Button className="w-full" style={{ padding: "1.5rem 0" }}>
            Cancel
          </Button>
        </Col>
        <Col xs={8} span={6}>
          <Button
            type="primary"
            className="w-full"
            style={{ padding: "1.5rem 0" }}
            loading={isLoading}
            onClick={handleAddDomain}
            disabled={!domain}
          >
            Add
          </Button>
        </Col>
      </Row>
    </Drawer>
  );
};

export default DrawerComponent;
