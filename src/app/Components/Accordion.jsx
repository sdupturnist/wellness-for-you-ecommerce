'use client'

import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid'; // Import icons from Heroicons

const AccordionItem = ({ title, children, isOpen, onClick }) => (
  <div className="border border-gray-300 rounded-lg mb-4">
    <button
      onClick={onClick}
      className="w-full text-left p-4 font-semibold transition-all rounded-t-lg flex items-center justify-between"
    >
      <span>{title}</span>
      {isOpen ? (
        <MinusIcon className="h-5 w-5 text-gray-600" />
      ) : (
        <PlusIcon className="h-5 w-5 text-gray-600" />
      )}
    </button>
    {isOpen && <div className="p-4 bg-white rounded-b-lg">{children}</div>}
  </div>
);

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          onClick={() => toggleAccordion(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
