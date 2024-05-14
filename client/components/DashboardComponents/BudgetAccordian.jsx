import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography, Button } from "@mui/material";
import CategoryTable from "./CategoryView";
import NeedsTable from "./NeedsTable";
import WantsTable from "./WantsTable";
import DebtTable from "./DebtTable";
import VacationTable from "./VacationTable";
import SubscriptionsTable from "./SubscriptionsTable";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";

const BudgetAccordian = ({ goalData, selectedCategories }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const calculateTotalSaved = (category) => {
    return goalData[category].reduce((total, goal) => {
      return total + goal.amountPaid;
    }, 0);
  };

  return (
    <div>
      {Object.keys(goalData).map((category) => (
        <div key={category}>
          <Accordion
            expanded={accordionOpen}
            onChange={() => setAccordionOpen(!accordionOpen)}
          >
            <AccordionSummary
              sx={{ flexDirection: "row-reverse", justifyContent: "flex-end" }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography align="left">{category}</Typography>
              {accordionOpen && (
                <Button sx={{ color: "#1F648E" }}>
                  <FaCirclePlus />
                  Add Goals
                </Button>
              )}
              <Typography align="right">
                ${calculateTotalSaved("Needs")}
              </Typography>
              <BsThreeDotsVertical />
            </AccordionSummary>
            <AccordionDetails>
              <CategoryTable goalData={goalData[category]} />
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
      {selectedCategories.includes("bills") && <></>}
      {selectedCategories.includes("debt") && (
        <>
          <Accordion
            expanded={accordionOpen}
            onChange={() => setAccordionOpen(!accordionOpen)}
          >
            <AccordionSummary
              sx={{ flexDirection: "row-reverse" }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography align="left">Debt</Typography>
              {accordionOpen && (
                <Button sx={{ color: "#1F648E" }}>
                  <FaCirclePlus />
                  Add Goals
                </Button>
              )}
              <Typography align="right">
                ${calculateTotalSaved("debt")}
              </Typography>
              <BsThreeDotsVertical />
            </AccordionSummary>
            <AccordionDetails>
              <DebtTable goalData={goalData} />
            </AccordionDetails>
          </Accordion>
        </>
      )}
      {selectedCategories.includes("needs") && (
        <>
          <Accordion
            expanded={accordionOpen}
            onChange={() => setAccordionOpen(!accordionOpen)}
          >
            <AccordionSummary
              sx={{ flexDirection: "row-reverse" }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography align="left"> Needs</Typography>
              {accordionOpen && (
                <Button sx={{ color: "#1F648E" }}>
                  <FaCirclePlus />
                  Add Goals
                </Button>
              )}
              <Typography align="right">
                ${calculateTotalSaved("needs")}
              </Typography>
              <BsThreeDotsVertical />
            </AccordionSummary>
            <AccordionDetails>
              <NeedsTable goalData={goalData} />
            </AccordionDetails>
          </Accordion>
        </>
      )}
      {selectedCategories.includes("subscriptions") && (
        <>
          <Accordion
            expanded={accordionOpen}
            onChange={() => setAccordionOpen(!accordionOpen)}
          >
            <AccordionSummary
              sx={{ flexDirection: "row-reverse" }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography align="left">Subscriptions</Typography>
              {accordionOpen && (
                <Button sx={{ color: "#1F648E" }}>
                  <FaCirclePlus />
                  Add Goals
                </Button>
              )}
              <Typography align="right">
                ${calculateTotalSaved("subscriptions")}
              </Typography>
              <BsThreeDotsVertical />
            </AccordionSummary>
            <AccordionDetails>
              <SubscriptionsTable goalData={goalData} />
            </AccordionDetails>
          </Accordion>
        </>
      )}
      {selectedCategories.includes("wants") && (
        <>
          <Accordion
            expanded={accordionOpen}
            onChange={() => setAccordionOpen(!accordionOpen)}
          >
            <AccordionSummary
              sx={{ flexDirection: "row-reverse" }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography align="left">Wants</Typography>
              {accordionOpen && (
                <Button sx={{ color: "#1F648E" }}>
                  <FaCirclePlus />
                  Add Goals
                </Button>
              )}
              <Typography align="right">
                ${calculateTotalSaved("wants")}
              </Typography>
              <BsThreeDotsVertical />
            </AccordionSummary>
            <AccordionDetails>
              <WantsTable goalData={goalData} />
            </AccordionDetails>
            <AccordionActions></AccordionActions>
          </Accordion>
        </>
      )}
      {selectedCategories.includes("vacation") && (
        <>
          <Accordion
            expanded={accordionOpen}
            onChange={() => setAccordionOpen(!accordionOpen)}
          >
            <AccordionSummary
              sx={{ flexDirection: "row-reverse" }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography align="left">Vacation</Typography>
              {accordionOpen && (
                <Button sx={{ color: "#1F648E" }}>
                  <FaCirclePlus />
                  Add Goals
                </Button>
              )}
              <Typography align="right">
                ${calculateTotalSaved("vacation")}
              </Typography>
              <BsThreeDotsVertical />
            </AccordionSummary>
            <AccordionDetails>
              <VacationTable goalData={goalData} />
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </div>
  );
};

export default BudgetAccordian;
