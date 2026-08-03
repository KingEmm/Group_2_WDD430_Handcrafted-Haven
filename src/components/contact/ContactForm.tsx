"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form);

    alert("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div
      id="contact-form"
      className="rounded-2xl bg-white p-8 shadow-xl lg:p-12"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#B88A4A]">
        Send Us A Message
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Phone (Optional)"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <Input
            label="Subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#2C241F]">
            Message
          </label>

          <textarea
            name="message"
            rows={6}
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#B88A4A]"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-3 rounded-lg bg-[#B88A4A] px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-[#A6783F]"
        >
          Send Message
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

type InputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  type?: string;
};

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#2C241F]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#B88A4A]"
      />
    </div>
  );
}