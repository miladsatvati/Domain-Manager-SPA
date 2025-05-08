import { Col, Row } from "antd";
import TitleDomain from "./TitleDomain";
import AddButton from "./AddButton";
import SearchInput from "./SearchInput";

const TopSection = () => {

  return (
    <div className="p-6 sm:p-12 w-full">
      <TitleDomain />
      <Row gutter={[16, 36]} justify="space-between" align="middle">
        <AddButton />

        <Col xs={24} sm={12} md={14} lg={16}>
          <Row gutter={[16, 36]} justify="end">
            <SearchInput />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TopSection;
