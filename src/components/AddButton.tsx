import { PlusOutlined } from "@ant-design/icons";
import { Button, Col } from "antd";
import { useContextValue } from "../helpers/useContext";



const AddButton = () => {
  const { showDrawer } = useContextValue();
  return (
    <Col xs={24} sm={12} md={10} lg={6}>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        size="large"
        block
        style={{ padding: "1.6rem 2rem" }}
        onClick={showDrawer}
      >
        Add Domain
      </Button>
    </Col>
  );
};

export default AddButton;
