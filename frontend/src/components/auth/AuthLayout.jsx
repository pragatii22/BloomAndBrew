import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const AuthLayout = ({ visual, children }) => (
  <div className="min-h-screen w-full bg-gradient-page flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-[960px] card rounded-2xl overflow-hidden grid lg:grid-cols-[42%_58%]">
      {visual}

      <div className="p-8 sm:p-10 flex flex-col justify-center">
        <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <img src={logo} alt="" className="w-7 h-7 rounded-full object-cover" />
          <span className="font-heading text-sm font-bold text-heading">Floral Bloom &amp; Brew</span>
        </Link>
        {children}
      </div>
    </div>
  </div>
);

export default AuthLayout;
