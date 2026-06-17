import { useState, useEffect, useRef } from "react";
import { Link, NavLink, Outlet } from "react-router";
import logo from "../assets/courier-logo.png"
import { FaBoxOpen, FaHome, FaUserAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { MdDashboard, MdDirectionsBike, MdTaskAlt } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { RiEBikeFill } from "react-icons/ri";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

export default function DashboardLayout() {
    const { role } = useRole();
    const { logout, user } = useAuth()

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [tooltip, setTooltip] = useState({ label: "", top: 0, visible: false });
    const [profileOpen, setProfileOpen] = useState(false);

    const profileRef = useRef(null);

    useEffect(() => {
        const checkSize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setSidebarOpen(false);
                setMobileMenuOpen(false);
            }
        };
        checkSize();
        window.addEventListener("resize", checkSize);
        return () => window.removeEventListener("resize", checkSize);
    }, []);

    useEffect(() => {
        const handleOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    const isExpanded = isMobile ? mobileMenuOpen : sidebarOpen;

    const handleToggle = () => {
        if (isMobile) {
            setMobileMenuOpen((prev) => !prev);
        } else {
            setSidebarOpen((prev) => !prev);
        }
    };

    const NavItem = ({ icon, label, to }) => (
        <NavLink
            to={to}
            end
            onClick={() => {
                if (isMobile) setMobileMenuOpen(false);
            }}
            onMouseEnter={(e) => {
                if (!isExpanded) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltip({ label, top: rect.top + rect.height / 2, visible: true });
                }
            }}
            onMouseLeave={() => setTooltip((t) => ({ ...t, visible: false }))}
            className="nav-item w-full flex items-center rounded-xl px-2 py-2.5 relative group"
        >
            <div className="item-bg absolute inset-0 rounded-xl transition-all duration-200" />
            <span className="nav-icon relative z-10 text-xl shrink-0 w-8 flex items-center justify-center text-white pointer-events-none">
                {icon}
            </span>
            <span
                className={`nav-label label-transition relative z-10 ml-2 text-sm font-medium pointer-events-none ${isExpanded ? "label-visible" : "label-hidden"}`}
            >
                {label}
            </span>
            <span className="active-dot absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400 glow-dot pointer-events-none" />
        </NavLink>
    );

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

    return (
        <div
            className={`layout-root flex h-screen bg-gray-950 text-white overflow-hidden ${!isExpanded ? "collapsed" : ""}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .layout-root {
          --sidebar-w: 270px;
        }
        .layout-root.collapsed {
          --sidebar-w: 0px;
        }

        /* Desktop collapsed = icon-only strip */
        @media (min-width: 768px) {
          .layout-root.collapsed {
            --sidebar-w: 64px;
          }
        }

        .sidebar-el {
          width: var(--sidebar-w);
          transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .navbar-el {
          left: var(--sidebar-w);
          transition: left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .main-el {
          margin-left: var(--sidebar-w);
          transition: margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .label-transition {
          transition: opacity 0.2s ease, transform 0.25s ease, max-width 0.35s cubic-bezier(0.4,0,0.2,1);
          white-space: nowrap;
          overflow: hidden;
        }

        .label-visible {
          opacity: 1;
          transform: translateX(0);
          max-width: 160px;
        }

        .label-hidden {
          opacity: 0;
          transform: translateX(-8px);
          max-width: 0;
        }

        .nav-item:hover .item-bg {
          background: rgba(99, 102, 241, 0.15);
        }

        .nav-item.active .item-bg {
          background: rgba(99, 102, 241, 0.25);
        }

        .nav-item .nav-icon {
          color: white;
        }
        .nav-item:hover .nav-icon {
          color: #a5b4fc;
        }
        .nav-item.active .nav-icon {
          color: #818cf8;
        }

        .nav-item .nav-label {
          color: white;
        }
        .nav-item:hover .nav-label {
          color: #e0e7ff;
        }
        .nav-item.active .nav-label {
          color: #a5b4fc;
        }

        .nav-item .active-dot {
          display: none;
        }
        .nav-item.active .active-dot {
          display: block;
        }

        .sidebar-overlay {
          transition: opacity 0.3s ease;
        }

        .glow-dot {
          box-shadow: 0 0 0 2px #4f46e5, 0 0 10px rgba(99,102,241,0.6);
        }

        .nav-tooltip {
          position: fixed;
          left: 68px;
          background: #1e1b4b;
          color: #c7d2fe;
          font-size: 12px;
          font-weight: 500;
          padding: 5px 10px;
          border-radius: 8px;
          border: 1px solid rgba(99,102,241,0.35);
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.18s ease, transform 0.18s ease;
          z-index: 9999;
          box-shadow: 0 4px 16px rgba(0,0,0,0.4);
        }
        .nav-tooltip::before {
          content: '';
          position: absolute;
          left: -5px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 5px 5px 5px 0;
          border-style: solid;
          border-color: transparent rgba(99,102,241,0.35) transparent transparent;
        }

        .profile-dropdown {
          animation: dropIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            {/* Mobile overlay — tap outside closes sidebar */}
            {isMobile && mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10 sidebar-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* FIXED Sidebar */}
            <aside className="sidebar-el fixed top-0 left-0 h-screen z-20 flex flex-col bg-gray-900 border-r border-gray-800/60 shrink-0">
                <Link to="/" className="flex items-center h-16 px-4 shrink-0">
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 shadow-lg">
                        <img src={logo} alt="" />
                    </div>
                    <span
                        className={`label-transition ml-3 font-semibold text-white tracking-tight ${isExpanded ? "label-visible" : "label-hidden"}`}
                    >
                        SwiftMove
                    </span>
                </Link>

                <nav className="flex-1 py-4 space-y-3 px-2 overflow-hidden">
                    <NavItem icon={<MdDashboard size={20} />} label="Dashboard" to="/dashboard" />

                    {role === 'user' && (
                        <NavItem icon={<FaBoxOpen size={20} />} label="My Parcels" to="/dashboard/myParcels" />
                    )}

                    {role === "admin" && (
                        <NavItem icon={<MdDirectionsBike size={20} />} label="All Riders" to="/dashboard/allRiders" />
                    )}

                    {role === "admin" && (
                        <NavItem icon={<HiUsers size={20} />} label="All Users" to="/dashboard/allUsers" />
                    )}

                    {role === 'admin' && (
                        <NavItem icon={<RiEBikeFill />} label="Assign Rider" to="/dashboard/assignRider" />
                    )}

                    {role === 'rider' && (
                        <NavItem icon={<RiEBikeFill />} label="Assigned Delivery" to="/dashboard/assignedDelivery" />
                    )}

                    {role === 'rider' && (
                        <NavItem icon={<MdTaskAlt />} label="Completed Delivery" to="/dashboard/completed-delivery" />
                    )}
                </nav>
            </aside>

            {/* Main content area */}
            <div className="main-el flex-1 flex flex-col min-w-0">

                {/* FIXED Top Navbar */}
                <header className="navbar-el fixed top-0 right-0 h-16 bg-gray-900/80 backdrop-blur border-b border-gray-800/60 flex items-center justify-between px-4 z-10">

                    {/* Toggle Button */}
                    <button
                        onClick={handleToggle}
                        className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-indigo-600/30 border border-gray-700/60 hover:border-indigo-500/40 flex items-center justify-center text-gray-400 hover:text-indigo-300 transition-all duration-200"
                        title="Toggle Sidebar"
                    >
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-0" : "rotate-180"}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setProfileOpen((prev) => !prev)}
                            className="flex items-center gap-2.5 group"
                        >
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="profile"
                                    className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/50 group-hover:ring-indigo-400 transition-all duration-200"
                                />
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm ring-2 ring-indigo-500/50 group-hover:ring-indigo-400 transition-all duration-200">
                                    {user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}
                            <div className="hidden md:flex flex-col items-start">
                                <span className="text-white text-sm font-medium leading-tight">
                                    {user?.displayName || "User"}
                                </span>
                                <span className="text-indigo-400 text-xs capitalize">{role}</span>
                            </div>
                            <svg
                                className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 hidden md:block ${profileOpen ? "rotate-180" : ""}`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {profileOpen && (
                            <div className="profile-dropdown absolute right-0 top-12 w-56 bg-gray-900 border border-gray-700/60 rounded-xl shadow-2xl overflow-hidden z-50">
                                <div className="px-4 py-3 border-b border-gray-700/60 flex items-center gap-3">
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt="" className="w-9 h-9 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                                            {user?.displayName?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <p className="text-white text-sm font-semibold truncate">{user?.displayName || "User"}</p>
                                        <p className="text-gray-400 text-xs truncate">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="py-1">
                                    <Link
                                        to="/dashboard/my-profile"
                                        onClick={() => setProfileOpen(false)}
                                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors duration-150"
                                    >
                                        <FaUserAlt size={14} />
                                        My Profile
                                    </Link>
                                    <Link
                                        to="/"
                                        onClick={() => setProfileOpen(false)}
                                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-indigo-600/20 hover:text-indigo-300 transition-colors duration-150"
                                    >
                                        <FaHome size={15} />
                                        Go to Home
                                    </Link>
                                </div>

                                <div className="border-t border-gray-700/60 py-1">
                                    <button
                                        onClick={() => { setProfileOpen(false); handleLogout(); }}
                                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-150"
                                    >
                                        <CiLogout size={18} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Scrollable outlet */}
                <main className="mt-16 flex-1 overflow-y-auto p-5 bg-white">
                    <Outlet />
                </main>
            </div>

            {/* Tooltip for collapsed desktop sidebar */}
            {tooltip.visible && !isExpanded && !isMobile && (
                <div
                    className="nav-tooltip"
                    style={{ top: tooltip.top, transform: "translateY(-50%)", opacity: 1 }}
                >
                    {tooltip.label}
                </div>
            )}
        </div>
    );
}