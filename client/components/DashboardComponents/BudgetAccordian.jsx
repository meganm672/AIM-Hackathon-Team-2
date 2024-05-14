import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
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
    return goalData.reduce((total, goal) => {
      if (selectedCategories.includes(category)) {
        return total + goal.amountPaid;
      }
      return total;
    }, 0);
  };
  const handleAccordionChange = (category) => {
    setAccordionOpen(prevState => ({
      ...prevState,
      [category]: !prevState[category]
    }));
  };
  return (
    <div>
      {selectedCategories.map(category => (
        <Accordion
          key={category}
          expanded={accordionOpen[category]}
          onChange={() => handleAccordionChange(category)}
        >
          <AccordionSummary
            sx={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center"
            }}
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
              <Typography align="left" sx={{width:"50%"}} >{category.charAt(0).toUpperCase() + category.slice(1)}</Typography>
              {accordionOpen[category] && 
              <Button sx={{ color: "#1F648E"}}>
                <FaCirclePlus />
                Add Goals
              </Button>
              }
              <Typography align="right" sx={{width:"50%"}}>${calculateTotalSaved(category)}</Typography>
              <BsThreeDotsVertical />
          </AccordionSummary>
          <AccordionDetails>
            {/* Render respective table based on category */}
            {category === 'bills' && <GoalsTable goalData={goalData} category={category} />}
            {category === 'debt' && <GoalsTable goalData={goalData} category={category} />}
            {category === 'needs' && <GoalsTable goalData={goalData} category={category} />}
            {category === 'subscriptions' && <GoalsTable goalData={goalData} category={category} />}
            {category === 'wants' && <GoalsTable goalData={goalData} category={category} />}
            {category === 'vacation' && <GoalsTable goalData={goalData} category={category} />}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default BudgetAccordian;
