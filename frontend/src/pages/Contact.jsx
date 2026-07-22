import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { sendContactMessage } from "../service/api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return toast.error("Please fill in every field");
    }
    setSending(true);
    try {
      await sendContactMessage(form);
      toast.success("Thanks! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't send your message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="mb-8 max-w-xl">
        <h1 className="text-2xl font-bold text-heading">Get in Touch</h1>
        <p className="text-sm text-muted mt-1">
          Have questions about custom arrangements, weddings, or bulk deliveries? Reach out to us.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <Card padding="p-6 sm:p-8" className="lg:col-span-5 space-y-6">
          <h2 className="text-base font-bold text-heading pb-3 border-b border-border">Florist Studio</h2>

          {[
            { icon: MapPin, label: "Address", value: "Gairidhara, Kathmandu, Nepal" },
            { icon: Phone, label: "Phone", value: "+977 9801234567" },
            { icon: Mail, label: "Email", value: "hello@floralbloom.com" },
            { icon: Clock, label: "Studio Hours", value: "Sun – Fri: 9:00 AM – 7:00 PM" },
          ].map((item) => (
            <div key={item.label} className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-soft-pink text-primary-dark flex items-center justify-center shrink-0">
                <item.icon size={17} />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-muted uppercase tracking-wide">{item.label}</h4>
                <p className="text-sm text-heading font-medium mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </Card>

        <form onSubmit={handleSendMessage} className="lg:col-span-7">
          <Card padding="p-6 sm:p-8" className="space-y-5">
            <h2 className="text-base font-bold text-heading pb-3 border-b border-border">Send us a Message</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Your Name" type="text" required placeholder="John Doe" value={form.name} onChange={set("name")} />
              <Input label="Your Email" type="email" required placeholder="john@example.com" value={form.email} onChange={set("email")} />
            </div>

            <Textarea
              label="Your Message"
              rows={5}
              required
              placeholder="Write your request or custom design specifications…"
              value={form.message}
              onChange={set("message")}
            />

            <Button loading={sending} type="submit" className="flex items-center gap-2">
              <Send size={15} /> Send Message
            </Button>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Contact;
