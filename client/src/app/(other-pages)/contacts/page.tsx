"use client";
import React, { useState } from "react";
import { contactData, webBlocksDataset } from "@/constants/data";
import Navbar from "@/components/navbar";

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
      <Navbar navigation={webBlocksDataset.navigationData}/>
       <section className="py-24 flex flex-col items-center justify-center bg-background ">
      
      {/* Heading Section */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-foreground leading-tight">
          {contactData.heading}
        </h2>
        <p className="text-lg text-accent mt-3">
          {contactData.description}
        </p>
      </div>

      {/* Contact Details */}
      <div className="mt-8 space-y-5 text-center text-lg">
        <p>
          📧 <a href={`mailto:${contactData.email}`} className="text-blue-600 hover:text-blue-500 transition duration-200">
            {contactData.email}
          </a>
        </p>
        <p>
          📞 <a href={`tel:${contactData.phone}`} className="text-blue-600 hover:text-blue-500 transition duration-200">
            {contactData.phone}
          </a>
        </p>
        <p>📍 {contactData.address}</p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="mt-10 space-y-6 w-full max-w-lg">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
          required
        />
        <button
          type="submit"
          className="w-full py-4 text-lg font-semibold bg-accent text-white hover:bg-accent/80 transition duration-200"
        >
          Send Message
        </button>
      </form>


    </section>
    </div>
   
  );
};

export default Contact;
