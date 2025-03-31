"use client";

// import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

import Alert from "../../components/alert";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Textarea from "@/components/textarea";

const useAlert = () => {
  const [alert, setAlert] = useState({ show: false, text: "", type: "danger" });

  const showAlert = ({ text, type = "danger" }: { text: string; type?: string }) => setAlert({ show: true, text, type });
  const hideAlert = () => setAlert({ show: false, text: "", type: "danger" });

  return { alert, showAlert, hideAlert };
};

const FeedBack = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = ({ target: { name, value } }: { target: { name: string; value: string } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showAlert({ text: "Thank you for your message 😃", type: "success" });

      setTimeout(() => {
        hideAlert();
        setForm({ name: "", email: "", message: "" });
      }, 3000);
    }, 1500);

    // emailjs
    //   .send(
    //     process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    //     process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    //     {
    //       from_name: form.name,
    //       to_name: "Ali Malik",
    //       from_email: form.email,
    //       to_email: "alimalikali1928@gmail.com",
    //       message: form.message,
    //     },
    //     process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    //   )
    //   .then(
    //     () => {
    //       setLoading(false);
    //       showAlert({
    //         show: true,
    //         text: "Thank you for your message 😃",
    //         type: "success",
    //       });

    //       setTimeout(() => {
    //         hideAlert(false);
    //         setForm({
    //           name: "",
    //           email: "",
    //           message: "",
    //         });
    //       }, [3000]);
    //     },
    //     (error) => {
    //       setLoading(false);
    //       console.error(error);

    //       showAlert({
    //         show: true,
    //         text: "I didn't receive your message 😢",
    //         type: "danger",
    //       });
    //     }
    //   );
  };

  return (
    <section className="mx-auto flex w-full max-w-screen-2xl justify-center py-24" id="contact">
      <div className="flex w-full max-w-2xl flex-col justify-center gap-6">
        <h3 className="text-accent text-3xl font-semibold">Let&apos;s talk</h3>
        <p className="text-foreground">Ready to build, refine, or transform your online presence? Let’s collaborate to create something exceptional.</p>

        {alert.show && <Alert {...alert} />}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input className="bg-background" type="text" name="name" value={form.name} placeholder="ex., Ali Zulfiqar" onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="email">Email address</Label>
              <Input className="bg-background" type="email" name="email" value={form.email} placeholder="ex., alimalikali1928@gmail.com" onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label htmlFor="message">Your message</Label>
            <Textarea name="message" value={form.message} placeholder="Share your thoughts or inquiries..." onChange={handleChange} />
          </div>

          <Button type="submit" disabled={loading} className="bg-foreground hover:bg-accent">
            {loading ? "Sending..." : "Send Message"} ↗
          </Button>
        </form>
      </div>
    </section>
  );
};

export default FeedBack;
