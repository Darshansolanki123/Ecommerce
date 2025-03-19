import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const About = () => {
  return (
    <Box
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-100"
    >
      <Box
        className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6"
      >
        <Typography variant="h3" className="text-center font-bold text-gray-800 mb-6">
          About Us
        </Typography>

        <Card className="mb-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <Typography variant="h5" className="font-semibold text-gray-700">
              Welcome to Our Store
            </Typography>
            <Typography variant="body1" className="text-gray-600 mt-2">
              A modern and seamless online shopping experience powered by the MERN stack.
            </Typography>
          </CardContent>
        </Card>

        <Card className="mb-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <Typography variant="h5" className="font-semibold text-gray-700">
              Founder’s Vision
            </Typography>
            <Typography variant="body1" className="text-gray-600 mt-2">
              Created by <b>Darshan Solanki</b>, this platform aims to provide a user-friendly and efficient shopping experience.
            </Typography>
          </CardContent>
        </Card>

        <Card className="mb-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <Typography variant="h5" className="font-semibold text-gray-700">
              Technology-Driven
            </Typography>
            <Typography variant="body1" className="text-gray-600 mt-2">
              Built with <b>MongoDB, Express.js, React.js, and Node.js</b> for high performance and scalability.
            </Typography>
          </CardContent>
        </Card>

        <Card className="mb-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <Typography variant="h5" className="font-semibold text-gray-700">
              Secure Payments
            </Typography>
            <Typography variant="body1" className="text-gray-600 mt-2">
              Integrated with multiple payment gateways for a smooth and secure checkout.
            </Typography>
          </CardContent>
        </Card>

        <Card className="mb-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <Typography variant="h5" className="font-semibold text-gray-700">
              User-Centric Design
            </Typography>
            <Typography variant="body1" className="text-gray-600 mt-2">
              Fully responsive, ensuring an optimized experience across all devices.
            </Typography>
          </CardContent>
        </Card>

        <Card className="mb-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <Typography variant="h5" className="font-semibold text-gray-700">
              Fast & Reliable
            </Typography>
            <Typography variant="body1" className="text-gray-600 mt-2">
              Lightning-fast load times with optimized backend and frontend performance.
            </Typography>
          </CardContent>
        </Card>

        <Card className="mb-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <Typography variant="h5" className="font-semibold text-gray-700">
              Diverse Product Range
            </Typography>
            <Typography variant="body1" className="text-gray-600 mt-2">
              Browse through a variety of high-quality products at competitive prices.
            </Typography>
          </CardContent>
        </Card>

        <Card className="mb-4 hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <Typography variant="h5" className="font-semibold text-gray-700">
              Customer Support
            </Typography>
            <Typography variant="body1" className="text-gray-600 mt-2">
              Dedicated customer service to ensure a hassle-free shopping journey.
            </Typography>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardContent>
            <Typography variant="h5" className="font-semibold text-gray-700">
              Future Expansion
            </Typography>
            <Typography variant="body1" className="text-gray-600 mt-2">
              Constantly evolving with new features and enhancements for a better experience.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default About;
