import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  ChartBarIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  QueueListIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import Atm from "@/pages/dashboard/atm";
import SearchATM from "@/pages/dashboard/SearchATM";
import ATMCharts from "@/pages/dashboard/ATMCharts";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <QueueListIcon {...icon} />,
        name: "Ver ATMs",
        path: "/atm",
        element: <Atm />,
      },
      
      {
        icon: <ChartBarIcon {...icon} />,
        name: "Gráficos & Analytics",
        path: "/analytcs",
        element: <ATMCharts />,
      },
      
      {
        icon: <MagnifyingGlassCircleIcon {...icon} />,
        name: "Pesquisar ATM",
        path: "/search",
        element: <SearchATM />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Perfil",
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    title: "Autenticação",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
