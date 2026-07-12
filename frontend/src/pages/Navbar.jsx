import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";

const Navbar = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/login");

    };

    return (

<header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-pink-100">

<div className="max-w-7xl mx-auto">

<div className="flex items-center justify-between h-20 px-6">

{/* Logo */}

<Link
to="/"
className="flex items-center gap-3"
>

<img

src="/logo.png"

alt="logo"

className="w-12 h-12 object-contain"

/>

<div>

<h1 className="text-2xl font-bold text-pink-500">

Floral Bloom

</h1>

<p className="text-xs text-gray-400">

Bloom & Brew

</p>

</div>

</Link>

{/* Desktop */}

<nav className="hidden lg:flex items-center gap-10">

<Link
to="/"
className="font-medium text-gray-700 hover:text-pink-500 duration-300"
>

Home

</Link>

<Link
to="/products"
className="font-medium text-gray-700 hover:text-pink-500 duration-300"
>

Flowers

</Link>

<Link
to="/orders"
className="font-medium text-gray-700 hover:text-pink-500 duration-300"
>

Orders

</Link>

<Link
to="/contact"
className="font-medium text-gray-700 hover:text-pink-500 duration-300"
>

Contact

</Link>

{role==="admin" && (

<Link
to="/admin"
className="font-medium text-gray-700 hover:text-pink-500 duration-300"
>

Admin

</Link>

)}

</nav>

{/* Right */}

<div className="hidden lg:flex items-center gap-5">

<Link
to="/cart"
className="relative"
>

<ShoppingCart
size={24}
className="text-gray-700 hover:text-pink-500 duration-300"
/>

</Link>

{token ?

<>

<button

className="w-10 h-10 rounded-full bg-pink-100 flex justify-center items-center"

>

<User
size={20}
className="text-pink-600"
/>

</button>

<button

onClick={logout}

className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full duration-300"

>

Logout

</button>

</>

:

<Link

to="/login"

className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full duration-300"

>

Login

</Link>

}

</div>

{/* Mobile */}

<button

className="lg:hidden"

onClick={()=>setOpen(!open)}

>

{

open ?

<X size={30}/>

:

<Menu size={30}/>

}

</button>

</div>

{/* Mobile Drawer */}

{

open && (

<div className="lg:hidden border-t bg-white">

<div className="flex flex-col p-6 gap-5">

<Link to="/">Home</Link>

<Link to="/products">Flowers</Link>

<Link to="/orders">Orders</Link>

<Link to="/contact">Contact</Link>

<Link to="/cart">Cart</Link>

{

role==="admin" &&

<Link to="/admin">

Admin

</Link>

}

{

token ?

<button

onClick={logout}

className="bg-pink-500 text-white rounded-xl py-3"

>

Logout

</button>

:

<Link

to="/login"

className="bg-pink-500 text-white rounded-xl py-3 text-center"

>

Login

</Link>

}

</div>

</div>

)

}

</div>

</header>

);

};

export default Navbar;