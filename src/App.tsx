import React from 'react';
import Index from './pages';
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <AnimatePresence exitBeforeEnter >
      <Index />
    </AnimatePresence>

  );
}

export default App;
