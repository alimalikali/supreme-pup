"use client";
import { contactData } from "@/constants/data";
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message sent!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full px-3 sm:px-12 lg:px-20">
      <section className="bg-background flex flex-col items-center justify-center py-28">
        {/* Heading Section */}
        <div className="text-center">
          <h2 className="text-accent text-4xl leading-tight font-bold">{contactData.heading}</h2>
          <p className="text-foreground mt-3 text-lg">{contactData.description}</p>
        </div>

        {/* Contact Details */}
        <div className="mt-8 space-y-5 text-center text-lg">
          <p>
            📧{" "}
            <a href={`mailto:${contactData.email}`} className="text-blue-600 transition duration-200 hover:text-blue-500">
              {contactData.email}
            </a>
          </p>
          <p>
            📞{" "}
            <a href={`tel:${contactData.phone}`} className="text-blue-600 transition duration-200 hover:text-blue-500">
              {contactData.phone}
            </a>
          </p>
          <p>📍 {contactData.address}</p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-lg space-y-6">
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-transparent p-4 transition focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600" required />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-transparent p-4 transition focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600" required />
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} rows={4} className="w-full rounded-lg border border-gray-300 bg-transparent p-4 transition focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-600" required />
          <button type="submit" className="bg-accent hover:bg-accent/80 w-full py-4 text-lg font-semibold text-white transition duration-200">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
