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
  HomeModernIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import Atm from "@/pages/dashboard/atm";
import SearchATM from "@/pages/dashboard/SearchATM";
import ATMByAgency from "./pages/dashboard/ATMByAgency";
import Relatorio from "./pages/dashboard/Relatorio2";
import ATMCharts from "@/pages/dashboard/ATMCharts";
import { SignIn, SignUp } from "@/pages/auth";
import App from "@/pages/permissions/App";

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
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Relatórios",
        path: "/relatorio",
        element: <Relatorio />,
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
        icon: <HomeModernIcon {...icon} />,
        name: "Agências",
        path: "/agencias",
        element: <ATMByAgency />,
      },

      {
        icon: <UserCircleIcon {...icon} />,
        name: "Perfil",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Permissões",
        path: "/permissions",
        element: <App />,
      },
    ],
  },
  {
    title: "Autenticação",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Ajustes",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: "",
        name: "",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
