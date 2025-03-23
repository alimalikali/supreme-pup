import React from "react";
import { Mail } from "lucide-react";
import { Typography } from "@/components/typography";

const Newsletter = () => {
  return (
      <div className="bg-foreground  p-10 w-full ">
    <section className="text-center">
    <Typography variant="h2" className="text-4xl font-extrabold text-background mb-4">Stay Updated!</Typography>
        <Typography variant="h2" className="text-lg text-accent mb-8">
          Subscribe to our newsletter and never miss out on our latest updates and offers.
        </Typography>

        {/* Form Section */}
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="relative w-full sm:w-2/3">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent w-5 h-5" />
            <input
              type="email"
              placeholder="Enter your email"
              className="pl-10 py-3 text-white rounded-lg border border-accent focus:outline-none w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-accent text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
          >
            Notify Me
          </button>
        </form>
    </section>
      </div>
  );
};

export default Newsletter;
