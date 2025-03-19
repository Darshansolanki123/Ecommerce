import React from "react";
import { Typography, Stepper, Step, StepLabel } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    { label: "Shipping Details", icon: <LocalShippingIcon className="text-xl sm:text-2xl" /> },
    { label: "Confirm Order", icon: <LibraryAddCheckIcon className="text-xl sm:text-2xl" /> },
    { label: "Payment", icon: <AccountBalanceIcon className="text-xl sm:text-2xl" /> },
  ];

  return (
    <div className="w-full flex justify-center py-6">
      <Stepper alternativeLabel activeStep={activeStep} className="w-full max-w-3xl">
        {steps.map((item, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel
              icon={item.icon}
              className={`text-sm sm:text-base ${
                activeStep >= index ? "text-red-500 font-semibold" : "text-gray-600"
              }`}
            >
              <Typography className="text-xs sm:text-sm md:text-base">{item.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutSteps;
