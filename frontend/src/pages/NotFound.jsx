import { Link } from "react-router-dom";
import { HelpCircle, ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";

const NotFound = () => (
  <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 space-y-5 max-w-lg mx-auto">
    <div className="w-16 h-16 bg-soft-pink rounded-full flex items-center justify-center text-primary-dark">
      <HelpCircle size={30} className="stroke-[1.5]" />
    </div>
    <div className="space-y-2">
      <h1 className="text-2xl font-bold text-heading">Page Not Found</h1>
      <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">
        The page you're looking for might have been removed or is temporarily unavailable.
      </p>
    </div>
    <Link to="/">
      <Button className="flex items-center gap-2">
        <ArrowLeft size={15} /> Go Back Home
      </Button>
    </Link>
  </div>
);

export default NotFound;
