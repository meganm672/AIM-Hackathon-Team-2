import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography, Box } from "@mui/material";
import BillsTable from "./BillsTable";
import NeedsTable from "./NeedsTable";
import WantsTable from "./WantsTable"
import DebtTable from "./DebtTable"
import VacationTable from "./VacationTable"
import SubscriptionsTable from "./SubscriptionsTable"

const BudgetAccordian = ({ goalData, selectedCategories }) => {

    const calculateTotalSaved = (category) => {
    return goalData.reduce((total, goal) => {
      if (selectedCategories.includes(category)) {
        return total + goal.amountPaid;
      }
      return total;
    }, 0);
  };
  
  return (
    <div>
      {selectedCategories.includes("bills") && (
        <>

          <Typography>Bills</Typography>
          <Accordion>
            <AccordionSummary
              sx={{ flexDirection: "row-reverse", justifyContent: "flex-end"}}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography align="left" sx={{width:"50%"}}>Bills</Typography>
              <Typography align="right" sx={{width:"50%"}}>${calculateTotalSaved('bills')}</Typography>

            </AccordionSummary>
            <AccordionDetails>
              <BillsTable goalData={goalData} />
            </AccordionDetails>
          </Accordion>
        </>
      )}
         {selectedCategories.includes("debt") && (
        <>

          <Typography>Debt</Typography>
          <Accordion>
            <AccordionSummary
              sx={{ flexDirection: "row-reverse" }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
             <Typography align="left" sx={{width:"50%"}}>Debt</Typography> 
              <Typography align="right" sx={{width:"50%"}}>${calculateTotalSaved('debt')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DebtTable goalData={goalData} />
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
             <Typography align="left" sx={{width:"50%"}}> Needs</Typography> 
              <Typography align="right" sx={{width:"50%"}}>${calculateTotalSaved('needs')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <NeedsTable goalData={goalData} />
            </AccordionDetails>
          </Accordion>
        </>)}
        {selectedCategories.includes("subscriptions") && (
        <>

          <Typography>Subscriptions</Typography>
          <Accordion>
            <AccordionSummary
              sx={{ flexDirection: "row-reverse" }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography align="left" sx={{width:"50%"}}>Subscriptions</Typography>
              <Typography align="right" sx={{width:"50%"}}>${calculateTotalSaved('subscriptions')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SubscriptionsTable goalData={goalData} />
            </AccordionDetails>
          </Accordion>
        </>
      )}
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
              <Typography align="left" sx={{width:"50%"}}>Wants</Typography>
              <Typography align="right" sx={{width:"50%"}}>${calculateTotalSaved('wants')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <WantsTable goalData={goalData} />
            </AccordionDetails>
            <AccordionActions></AccordionActions>
          </Accordion>
        </>)}
        {selectedCategories.includes("vacation") && (
        <>

          <Typography>Vacation</Typography>
          <Accordion>
            <AccordionSummary
              sx={{ flexDirection: "row-reverse" }}
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography align="left" sx={{width:"50%"}}>Vacation</Typography>
              <Typography align="right" sx={{width:"50%"}} >${calculateTotalSaved('vacation')}</Typography>
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
