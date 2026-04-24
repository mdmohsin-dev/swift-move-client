import { useState, useEffect, useRef, useContext } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router";
import logo from "../../assets/courier-logo.png"
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sidebarRef = useRef(null);

  const { user, logout } = useAuth()

  const navLinks = <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/send-parcel">Send Parcel</NavLink></li>
    <li><NavLink to="/coverage">Coverage</NavLink></li>
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
      confirmButtonText: "I agree"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
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

      {/* NAVBAR */}
      <nav className="navbar max-w-350 mx-auto ">

        <div className="w-full bg-white py-5 px-6 rounded-2xl">
          <div className="flex justify-between items-center w-full transition-all duration-500 ease-in-out">

            <Link to="/" className="flex items-center gap-1">
              <img src={logo} className="w-10" alt="" />
              <h3 className="text-black text-3xl font-bold">SwiftMove</h3>
            </Link>

            <div className="flex gap-10 items-center">
              <ul className="lg:flex hidden gap-6 text-black text-[17px] font-inter font-medium">
                {navLinks}
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <div>
                {
                  user ?
                    <div className="relative">
                      <img
                        onClick={() => setOpen(!open)}
                        className="w-12 h-12 object-cover rounded-full cursor-pointer"
                        src={user?.photoURL}
                        alt=""
                      />

                      {open && (
                        <div className="absolute right-1 top-14 w-52 bg-[#EAECED] text-black p-4 shadow rounded-md flex flex-col ">
                          
                          <Link className="btn bg-[#F4AE33]" to="/dashboard">Dashboard</Link>
                          <button
                            onClick={handleLogout}
                            className="btn w-full mt-3 btn-gradient border-none bg-[#CAEB66]">Logout</button>
                        </div>
                      )}
                    </div>
                    :
                    <Link to="/login" className="btn border-none bg-[#CAEB66] px-6 text-black">Login</Link>
                }
              </div>

              <button
                className="flex lg:hidden"
                aria-label="Open"
                onClick={() => setSidebarOpen(true)}
              >
                <IoIosMenu size={34} color="#FF02CB"></IoIosMenu>
              </button>
            </div>

          </div>
        </div>
      </nav >

      <aside
        ref={sidebarRef}
        className={`sidebar ${sidebarOpen ? " open" : ""} fixed w-72 h-dvh bg-[#EDE8E3] pl-4 pt-4 pr-2`}
        aria-hidden={!sidebarOpen}
      >
        <div className="flex text-black justify-between items-center">
          <h3 className="text-3xl font-marker bg-linear-to-b from-black to-[#FF02CB] bg-clip-text text-transparent">SmartDeals</h3>
          <button
            aria-label="Close"
            onClick={() => setSidebarOpen(false)}
          >
            <IoMdClose size={34} color="black"></IoMdClose>
          </button>
        </div>

        <ul onClick={handleNavClick}
          className="flex flex-col gap-6 text-black text-xl font-semibold pt-6">
          {navLinks}
        </ul>

        <div>
          {/* {
            !user &&
            <button
              onClick={() => setSidebarOpen(false)}
            >
              <Link to="/login" className="absolute bottom-4 btn bg-red-500 border-none flex gap-4 text-lg py-4 px-6 font-exo hover:rounded-3xl transition-all duration-500 hover:bg-black">Sign In</Link>
            </button>
          } */}
        </div>
      </aside>
    </>
  );
}