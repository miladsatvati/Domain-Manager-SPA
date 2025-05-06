import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../features/domainSlice";

import { Button, Col, Input, Row, Typography } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import DropDown from "./DropDown";
import type { RootState } from "../store/store";
import type { ShowDrawerProp } from "../types/types";

const TopSection = ({ showDrawer }: ShowDrawerProp) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.domain.searchTerm);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="p-6 sm:p-12 w-full">
      <Typography.Title
        level={1}
        style={{ textAlign: "left", fontWeight: "300" }}
      >
        Domains
      </Typography.Title>

      <Row gutter={[16, 36]} justify="space-between" align="middle">
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

        <Col xs={24} sm={12} md={14} lg={16}>
          <Row gutter={[16, 36]} justify="end">
            <Col xs={24} sm={12} lg={6}>
              <DropDown />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Input
                className="border-2 border-gray-200 rounded-md"
                prefix={
                  <SearchOutlined
                    style={{ color: "rgba(0,0,0,.45)", paddingRight: ".5rem" }}
                  />
                }
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  padding: "1rem 2rem",
                  borderRadius: "6px",
                  border: "2px solid #e5e7eb",
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TopSection;
