import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { Menu } from "antd";
import { Box } from "@mui/material";
import "./style.css";

const Categories = ({ categories }) => {
  const { setSelectedCategory } = useMoralisDapp();

  function selectCategory(categoryId) {
    const selectedCategory = categories.filter(
      (category) => category["categoryId"] === categoryId
    );
    setSelectedCategory(selectedCategory[0]);
  }

  return (
    <Box sx={{ width: 1 }}>
      <Menu
        onClick={(e) => selectCategory(e.key)}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.09)",
          padding: "10px 0",
          borderRadius: 5,
          color: "yellow",
        }}
        mode="inline"
      >
        <Menu.ItemGroup key="categories" title="select category">
          {categories.map((category) => (
            <Menu.Item key={category["categoryId"]}>
              {category["category"]}
            </Menu.Item>
          ))}
        </Menu.ItemGroup>
      </Menu>
    </Box>
  );
};

export default Categories;
