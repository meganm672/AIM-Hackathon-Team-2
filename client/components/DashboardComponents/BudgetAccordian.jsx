import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography } from "@mui/material";
import BillsTable from "./BillsTable";

const BudgetAccordian = ({ goalData }) => {
  return (
    <div>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions></AccordionActions>
      </Accordion>
    </div>
  );
};

export default BudgetAccordian;
