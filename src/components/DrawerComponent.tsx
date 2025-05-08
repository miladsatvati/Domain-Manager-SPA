import { Drawer, Button, Input, Col, Row, message } from "antd";
import { useState } from "react";
import { usePostDomainMutation } from "../features/domainApiSlice";
import { useContextValue } from "../helpers/useContext";

const DrawerComponent = () => {
  const { onClose, open } = useContextValue();

  const [messageApi, contextHolder] = message.useMessage();
  const [domain, setDomain] = useState<string>("");
  const [postDomain, { isLoading }] = usePostDomainMutation();
  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };
  const handleAddDomain = async () => {
    const fullDomain = `http://${domain}`;
    const domainState = {
      id: new Date().toISOString(),
      domain: fullDomain,
      isActive: false,
      status: "pending" as const,
      createdDate: Math.floor(Date.now() / 1000),
    };
    try {
      await postDomain(domainState).unwrap();
      success();
      setDomain("");
      onClose();
    } catch (err) {
      error();
      console.error("Failed to add domain:", err);
      message.error("Failed to add domain");
    }
  };
  return (
    <>
      {contextHolder}
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
          onChange={handleDomainChange}
          value={domain}
          addonBefore="http://"
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
    </>
  );
};

export default DrawerComponent;
