import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Button from "../components/Button";
import { Mail, Phone, MapPin, Clock, Send, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const handleSendMessage = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll reply within 24 hours. 🌸");
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 md:py-16">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-pink-50 border border-pink-100/50 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles size={12} className="fill-current" />
            <span>Connect With Us</span>
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800">
            Get in Touch
          </h1>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            Have questions about custom floral designs or delivery schedules? Our team is here to assist you.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[32px] border border-pink-100/25 p-8 shadow-sm space-y-8">
              <h2 className="font-serif text-2xl font-bold text-gray-800 pb-3 border-b border-pink-50">
                Florist Studio
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 text-primary flex items-center justify-center shrink-0 border border-pink-100/40">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Address</h4>
                    <p className="text-sm text-gray-500 mt-1">Gairidhara, Kathmandu, Nepal</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 text-primary flex items-center justify-center shrink-0 border border-pink-100/40">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Phone</h4>
                    <p className="text-sm text-gray-500 mt-1">+977 9801234567</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 text-primary flex items-center justify-center shrink-0 border border-pink-100/40">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email</h4>
                    <p className="text-sm text-gray-500 mt-1">hello@floralbloom.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 text-primary flex items-center justify-center shrink-0 border border-pink-100/40">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Studio Hours</h4>
                    <p className="text-sm text-gray-500 mt-1">Sun - Fri: 9:00 AM - 7:00 PM</p>
                    <p className="text-xs text-gray-400 font-medium">Saturday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <form
            onSubmit={handleSendMessage}
            className="lg:col-span-7 bg-white rounded-[32px] border border-pink-100/25 p-8 md:p-10 shadow-sm space-y-6"
          >
            <h2 className="font-serif text-2xl font-bold text-gray-800 pb-3 border-b border-pink-50">
              Send us a Message
            </h2>

            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label="Your Name"
                type="text"
                required
                placeholder="John Doe"
              />
              <Input
                label="Your Email"
                type="email"
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">
                Your Message
              </label>
              <textarea
                rows="5"
                required
                placeholder="Write your request or comment here..."
                className="w-full border border-pink-100 bg-white px-5 py-4 rounded-2xl text-gray-700 outline-none transition-all duration-350 shadow-sm focus:border-primary focus:ring-4 focus:ring-pink-50/50 resize-none"
              />
            </div>

            <Button
              type="submit"
              className="py-4 font-bold shadow-pink-100 shadow-md inline-flex items-center justify-center gap-2 px-8"
            >
              <Send size={16} />
              <span>Send Message</span>
            </Button>
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;