import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import GoalsTable from "./GoalsTable";
import { Typography, Button, Box } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";

const BudgetAccordian = ({ goalData, selectedCategories }) => {
  // Initialize accordionOpen state with all categories closed
  const initialAccordionState = selectedCategories.reduce((acc, category) => {
    acc[category] = false;
    return acc;
  }, {});

  const [accordionOpen, setAccordionOpen] = useState(initialAccordionState);


  const calculateTotalSaved = (category) => {
    return goalData[category].reduce((total, goal) => {
      return total + goal.amountPaid;
    }, 0);
  };
  const handleAccordionChange = (category) => {
    setAccordionOpen((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };
  return (
    <div>
      {Object.keys(goalData).map((category) => (
        <div key={category}>
          <Accordion
            key={category}
            expanded={accordionOpen[category]}
            onChange={() => handleAccordionChange(category)}
          >
            <AccordionSummary
              sx={{ flexDirection: "row-reverse" }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography align="left">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Typography>
              {accordionOpen[category] && (
                <Button sx={{ color: "#1F648E" }}>
                  <FaCirclePlus />
                  Add Goals
                </Button>
              )}
              <Typography align="right">
                ${calculateTotalSaved(category)}
              </Typography>
              <BsThreeDotsVertical />
            </AccordionSummary>
            <AccordionDetails>
              {/* <CategoryTable goalData={goalData[category]} /> */}
              <GoalsTable goalData={goalData[category]} category={category} />
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default BudgetAccordian;
