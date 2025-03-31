"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Typography } from "@/components/typography";

// FAQ Data
const faqs = [
  {
    question: "What is Mern Shop?",
    answer: "Mern Shop is a world-class e-commerce platform where you can buy anything seamlessly.",
  },
  {
    question: "How can I track my order?",
    answer: "You can track your order from your account dashboard under the 'Orders' section.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, PayPal, and cryptocurrency payments.",
  },
  {
    question: "Can I return a product?",
    answer: "Yes, you can return a product within 30 days of purchase, provided it is in its original condition.",
  },
];

// Reusable FAQ Item Component
const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-100">
      <button onClick={onClick} className="text-foreground flex w-full items-center justify-between px-4 py-3 font-medium focus:outline-none">
        {question}
        <ChevronDown size={20} className={cn("transition-transform", isOpen ? "text-accent rotate-180" : "text-gray-500")} />
      </button>
      <div className={cn("overflow-hidden transition-all", isOpen ? "max-h-40 p-4 text-gray-700" : "max-h-0 p-0")}>{answer}</div>
    </div>
  );
};

// Main FAQ Component
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-background mx-auto flex max-w-screen-2xl items-center justify-center px-4 py-24">
      <div className="w-full max-w-2xl">
        <Typography variant="h1" className="text-accent mb-6 text-center text-3xl font-bold">
          Frequently Asked Questions
        </Typography>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} isOpen={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? null : index)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
