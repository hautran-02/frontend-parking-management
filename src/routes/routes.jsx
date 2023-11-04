import { CarOutlined, LineChartOutlined } from "@ant-design/icons";
import Home from "~/pages/Main/Home";
import Map from "~/pages/Main/Map";

// Public routes
const publicRoutes = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: "/dashboard",
    element: <Home />,
    icon: <LineChartOutlined />
  },
  {
    key: 'map',
    label: 'Bản đồ',
    path: "/map",
    element: <Map />,
    icon: <CarOutlined />
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
