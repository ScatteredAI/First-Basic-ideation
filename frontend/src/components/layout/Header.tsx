import React from 'react';
import { motion } from 'framer-motion';
import { BarChart4 } from 'lucide-react';

const Header = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-10"
  >
    <div className="flex justify-center mb-4">
      <div className="bg-blue-600 p-3 rounded-lg">
        <BarChart4 className="h-10 w-10 text-white" strokeWidth={1.5} />
      </div>
    </div>
    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
      Scattered AI Analyst
    </h1>
    <p className="text-gray-600 max-w-md mx-auto">
      AI-powered stock analysis and investment recommendations
    </p>
  </motion.div>
);

export default Header;