import { useState, useEffect, useRef } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router";
import logo from "../../assets/courier-logo.png"
import nameLogo from "../../assets/MoveFastLogo.png"
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sidebarRef = useRef(null);

  const { user, logout } = useAuth()
  const role = useRole()

  const navLinks = <>
    <li><NavLink to="/">Home</NavLink></li>
    {role.role === 'user' && (<li><NavLink to="/send-parcel">Send Parcel</NavLink></li>)}
    <li><NavLink to="/coverage">Coverage</NavLink></li>
    {role.role === 'user' && (<li><NavLink to="/beArider">Be a Rider</NavLink></li>)}
    {role.role === 'user' && (<li><NavLink to="/dashboard/myParcels">My Parcels</NavLink></li>)}
  </>

  const handleNavClick = (e) => {
    if (e.target.closest("a")) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to logout`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logout successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        logout().then(() => { });
      }
    });
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [sidebarOpen]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [sidebarOpen]);

  return (
    <>
      <style>{`
        .sidebar {
          z-index: 1100;
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sidebar.open { transform: translateX(0); }
      `}</style>


      {scrolled && <div className="h-20" />}

      {/* NAVBAR */}
      <nav
        className={`max-w-full mx-auto transition-all duration-300 ${scrolled
            ? "fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-350 mx-auto py-4 px-6">
          <div className="flex justify-between items-center w-full">

            <Link to="/" className="flex items-center gap-1">
              <img src={logo} className="w-10" alt="" />
              <img src={nameLogo} className="w-32" alt="" />
            </Link>

            <div className="flex gap-10 items-center">
              <ul className="lg:flex hidden gap-6 text-black text-[17px] font-inter font-medium">
                {navLinks}
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <div>
                {user ? (
                  <div className="relative">
                    <img
                      onClick={() => setOpen(!open)}
                      className="w-12 h-12 object-cover rounded-full cursor-pointer"
                      src={user?.photoURL}
                      alt=""
                    />
                    {open && (
                      <div className="absolute right-1 top-14 w-52 bg-[#EAECED] text-black p-4 shadow rounded-md flex flex-col">
                        <Link className="btn bg-[#F4AE33]" to="/dashboard">Dashboard</Link>
                        <button
                          onClick={handleLogout}
                          className="btn w-full mt-3 border-none bg-[#CAEB66]"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/login" className="btn hidden md:flex border-none bg-[#00B795] px-6 text-white">
                    Login
                  </Link>
                )}
              </div>

              <button
                className="flex lg:hidden"
                aria-label="Open"
                onClick={() => setSidebarOpen(true)}
              >
                <IoIosMenu size={34} className="border border-gray-200 rounded-sm" color="gray" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* SIDEBAR */}
      <aside
        ref={sidebarRef}
        className={`sidebar ${sidebarOpen ? "open" : ""} fixed w-72 h-dvh bg-[#EAECED] pl-4 pt-4 pr-2`}
        aria-hidden={!sidebarOpen}
      >
        <div className="flex text-black justify-between items-center">
          <h3 className="text-3xl font-marker bg-linear-to-b from-black to-[#FF02CB] bg-clip-text text-transparent">
            MoveFast
          </h3>
          <button aria-label="Close" onClick={() => setSidebarOpen(false)}>
            <IoMdClose size={34} color="black" />
          </button>
        </div>

        <ul
          onClick={handleNavClick}
          className="flex flex-col gap-6 text-black text-xl font-semibold pt-6"
        >
          {navLinks}
        </ul>

        <div className="flex md:hidden">
          {!user && (
            <button onClick={() => setSidebarOpen(false)}>
              <Link
                to="/login"
                className="bottom-4 btn mt-6 bg-[#CAEB66] border-none flex gap-4 text-lg py-4 px-6 font-exo hover:rounded-3xl transition-all duration-500 hover:bg-black"
              >
                Login
              </Link>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}