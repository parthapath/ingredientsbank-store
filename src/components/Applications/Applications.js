"use client";
import React, { useState, useEffect } from "react";

import { api_server } from "@/config";

import Checkbox from "@/components/FormElements/Checkbox/Checkbox";

const Applications = (props) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_server}/applications`);
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching data:", error.response.data);
      }
    };

    fetchData();
  }, []);

  return (
    <ul>
      {applications.length
        ? applications.map((item, i) => {
            return (
              <li key={i}>
                <Checkbox
                  checked={
                    props.selectedApplications.includes(item.name)
                      ? true
                      : false
                  }
                  name={item.id}
                  change={() => props.handleApplicationFilter(item.name)}
                  label={item.name}
                />
              </li>
            );
          })
        : null}
    </ul>
  );
};

export default Applications;
