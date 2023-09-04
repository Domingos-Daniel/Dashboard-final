import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ATMCard from "./ATMCard";
import PaginationButtons from "./PaginationButtons"; // Verifique o caminho correto

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  QueueListIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
 
  const data = [
    {
      label: "Cards",
      value: "dashboard",
      icon: Square3Stack3DIcon,
      desc: ``,
    },
    {
      label: "Lista",
      value: "profile",
      icon: ListBulletIcon,
      desc: ``,
    },
  ];
  
  export function Atm(){
    const [atms, setATMs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
      axios
        .get("https://my-json-server.typicode.com/Domingos-Daniel/api-teste/atms")
        .then((response) => {
          setATMs(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentATMs = atms.slice(firstItemIndex, lastItemIndex);
  
    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
    };
  
    const handlePrevPage = () => {
      setCurrentPage(currentPage - 1);
    };
    return (
      <>
      <Tabs value="dashboard">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
    
    {atms.length > itemsPerPage && (
        <PaginationButtons
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          lastItemIndex={lastItemIndex}
          totalItems={atms.length}
        />
      )}
       <div className="App mt-5 flex items-center justify-center">
          <div className="flex flex-wrap gap-6 sm:gap-4 md:gap-6 lg:gap-8">
          {currentATMs.map((atm) => (
          <ATMCard key={atm.id} atm={atm} />
        ))}
          </div>
        </div>
      </>
    );
  }

  export default Atm;