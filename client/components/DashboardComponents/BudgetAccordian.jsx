import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography } from "@mui/material";
import BillsTable from "./BillsTable";
import NeedsTable from "./NeedsTable";
import WantsTable from "./WantsTable"

const BudgetAccordian = ({ goalData, selectedCategories }) => {
  return (
    <div>
      {selectedCategories.includes("bills") && (
        <>

          <Typography>Bills</Typography>
          <Accordion>
            <AccordionSummary
              sx={{ flexDirection: "row-reverse" }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Bills
            </AccordionSummary>
            <AccordionDetails>
              <BillsTable goalData={goalData} />
            </AccordionDetails>
          </Accordion>
        </>
      )}
      {selectedCategories.includes("needs") && (
        <>

          <Typography>Needs</Typography>
          <Accordion>
            <AccordionSummary
              sx={{ flexDirection: "row-reverse" }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              Needs
            </AccordionSummary>
            <AccordionDetails>
              <NeedsTable goalData={goalData} />
            </AccordionDetails>
          </Accordion>
        </>)}
      {selectedCategories.includes("wants") && (
        <>

          <Typography>Wants</Typography>
          <Accordion>
            <AccordionSummary
              sx={{ flexDirection: "row-reverse" }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              Wants
            </AccordionSummary>
            <AccordionDetails>
              <WantsTable goalData={goalData} />
            </AccordionDetails>
            <AccordionActions></AccordionActions>
          </Accordion>
        </>)}
    </div>
  );
};

export default BudgetAccordian;
