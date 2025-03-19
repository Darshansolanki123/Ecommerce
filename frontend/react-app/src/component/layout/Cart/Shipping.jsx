import React, { useState } from "react";
import MetaData from "../metadata";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Country, State } from "country-state-city";
import { saveShippingInfo } from "../../../actions/cartAction.jsx";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./checkoutsteps.jsx";
import { TextField, MenuItem, Button, InputAdornment } from "@mui/material";
import { Home, LocationCity, Pin, Phone, Public, Apartment } from "@mui/icons-material";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 10) {
      alert.error("Phone Number should be exactly 10 digits long");
      return;
    }

    dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
    navigate("/order/confirm");
  };

  return (
    <>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0} />

      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Shipping Details
          </h2>

          <form onSubmit={shippingSubmit} className="flex flex-col space-y-6">
            <div className="p-2">
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="p-2">
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCity />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="p-2">
              <TextField
                label="Pin Code"
                type="number"
                variant="outlined"
                fullWidth
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Pin />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="p-2">
              <TextField
                label="Phone Number"
                type="number"
                variant="outlined"
                fullWidth
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="p-2">
              <TextField
                select
                label="Country"
                variant="outlined"
                fullWidth
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Public />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">Select Country</MenuItem>
                {Country.getAllCountries().map((item) => (
                  <MenuItem key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            {country && (
              <div className="p-2">
                <TextField
                  select
                  label="State"
                  variant="outlined"
                  fullWidth
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Apartment />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="">Select State</MenuItem>
                  {State.getStatesOfCountry(country).map((item) => (
                    <MenuItem key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            )}

            <div className="p-2">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!state}
                className="mt-4"
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
