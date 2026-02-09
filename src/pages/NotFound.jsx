import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 font-primary">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-9xl font-black text-blue-600 mb-4 tracking-tighter">
          404
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Button
          as={Link}
          to="/home"
          color="primary"
          size="lg"
          variant="shadow"
          className="font-bold px-10 py-7 text-lg rounded-full"
        >
          Back to Home
        </Button>
      </motion.div>

      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
      />
    </div>
  );
}
