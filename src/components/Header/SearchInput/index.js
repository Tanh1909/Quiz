import { Button, Dropdown, Empty, Select, Spin } from "antd";
import Search from "antd/es/transfer/search";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { findTopicsByName } from "../../../services/topic";
import { useNavigate } from "react-router-dom";

function SearchInput() {
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(false);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState();
  useEffect(() => {
    const idSetTimeout = setTimeout(() => {
      value && fetchData(value, 0, 5);
    }, 500);

    return () => clearTimeout(idSetTimeout);
  }, [value]);
  const handleChange = (e) => {
    setValue(e);
  };
  const fetchData = async (name, page, size) => {
    setItems([]);
    setFetching(true);
    const response = await findTopicsByName({ name, page, size });
    setItems(
      response.data.map((item, _) => {
        return {
          label: item.name,
          value: (
            <div
              style={{ padding: 5 }}
              onClick={() => navigate(`/detail-topics/${item.id}`)}
            >
              {item.name}
            </div>
          ),
        };
      })
    );
    setFetching(false);
  };

  return (
    <>
      <Select
        onSearch={handleChange}
        allowClear
        showSearch
        value={value}
        placeholder={"Tìm kiếm topic"}
        defaultActiveFirstOption={false}
        suffixIcon={null}
        filterOption={false}
        notFoundContent={fetching ? <Spin /> : <Empty />}
        options={(items || []).map((d) => ({
          value: d.value,
          label: d.text,
        }))}
      />
    </>
  );
}

export default SearchInput;
