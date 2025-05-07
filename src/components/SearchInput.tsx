import { SearchOutlined } from "@ant-design/icons";
import { Col, Input } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setSearchTerm } from "../features/domainSlice";

const SearchInput = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.domain.searchTerm);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
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
  );
};

export default SearchInput;
