import { CarOutlined, LineChartOutlined, UserOutlined } from "@ant-design/icons";
import Driver from "~/views/pages/Main/Driver";
import Home from "~/views/pages/Main/Home";
import Map from "~/views/pages/Main/Map";

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
  {
    key: 'driver',
    label: 'Quản lý chủ xe',
    path: "/driver",
    element: <Driver />,
    icon: <UserOutlined />
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
