import React from "react";
import { Mail } from "lucide-react";
import { Typography } from "@/components/typography";

const Newsletter = () => {
  return (
    <div className="bg-foreground w-full px-3 sm:px-12 lg:px-20">
      <div className="mx-auto my-10 flex w-full max-w-screen-2xl justify-center">
        <section className="text-center">
          <Typography variant="h2" className="text-background mb-4 text-4xl font-extrabold">
            Stay Updated!
          </Typography>
          <Typography variant="h2" className="text-accent mb-8 text-lg">
            Subscribe to our newsletter and never miss out on our latest updates and offers.
          </Typography>

          {/* Form Section */}
          <form className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="relative w-full sm:w-2/3">
              <Mail className="text-accent absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
              <input type="email" placeholder="Enter your email" className="border-accent w-full rounded-lg border py-3 pl-10 text-white focus:outline-none" required />
            </div>
            <button type="submit" className="bg-accent w-full rounded-lg px-8 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-gray-700 focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:outline-none sm:w-auto">
              Notify Me
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Newsletter;
