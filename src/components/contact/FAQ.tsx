"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Orders are carefully prepared and usually shipped within 3–5 business days. Delivery times vary depending on your location.",
  },
  {
    question: "Can I request custom-made products?",
    answer:
      "Yes. Many of our artisans accept custom orders. Simply contact us with your requirements.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Absolutely. We ship to many countries around the world using trusted delivery partners.",
  },
  {
    question: "How do I become an artisan?",
    answer:
      "Visit our Become an Artisan page or send us a message through the contact form. We'll guide you through the application process.",
  },
];
export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#FCFAF7] py-24">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B88A4A]">
            Frequently Asked Questions
          </p>

          <h2 className="mt-4 font-serif text-4xl text-[#2C241F] md:text-5xl">
            We've Got Answers
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#766B63]">
            Find answers to some of the most common questions about our
            handcrafted products and services.
          </p>
        </div>

        <div className="mt-14 space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-[#E8E1D9] bg-white"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between px-7 py-6 text-left"
              >
                <span className="font-medium text-[#2C241F]">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  open === index
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-7 pb-6 leading-8 text-[#766B63]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}