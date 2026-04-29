import { useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router";
import logo from "../assets/courier-logo.png"
import { FaArrowLeft, FaBoxOpen } from "react-icons/fa";
import { MdBarChart, MdDirectionsBike, MdPayment } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import useRole from "../hooks/useRole";

export default function DashboardLayout() {
    const { role } = useRole();
    console.log(role)

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [tooltip, setTooltip] = useState({ label: "", top: 0, visible: false });

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
            <span className="nav-icon relative z-10 text-xl shrink-0 w-8 flex items-center justify-center text-white">
                {icon}
            </span>
            <span
                className={`nav-label label-transition relative z-10 ml-2 text-sm font-medium ${isExpanded ? "label-visible" : "label-hidden"}`}
            >
                {label}
            </span>
            <span className="active-dot absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400 glow-dot" />
        </NavLink>
    );


    return (
        <div
            className="flex h-screen bg-gray-950 text-white overflow-hidden"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .sidebar-transition {
          transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
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
        .nav-item:hover .nav-tooltip {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

            {/* Mobile overlay */}
            {isMobile && mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10 sidebar-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`sidebar-transition relative z-20 flex flex-col bg-gray-900 border-r border-gray-800/60 shrink-0
          ${isMobile ? "absolute h-full" : "relative"}
          ${isExpanded ? "w-[270px]" : "w-16"}
        `}
            >

                <Link to="/dashboard"
                    className="flex items-center h-16 px-4 shrink-0">
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


                    {(role === 'user' || role === 'admin') && (
                        <NavItem
                            icon={<FaBoxOpen size={20} />}
                            label="My Parcels"
                            to="/dashboard/myParcels"
                        />
                    )}


                    {(role === "user" || role === "admin") && (
                        <NavItem
                            icon={<MdPayment size={20} />}
                            label="Payment History"
                            to="/dashboard/payment-history"
                        />
                    )}


                    {role === "admin" && (
                        <NavItem
                            icon={<MdDirectionsBike size={20} />}
                            label="All Riders"
                            to="/dashboard/allRiders"
                        />
                    )}


                    {role === "admin" && (
                        <NavItem
                            icon={<HiUsers size={20} />}
                            label="All Users"
                            to="/dashboard/allUsers"
                        />
                    )}

                </nav>



                <div className="border-t border-gray-800/60 p-3">
                    <Link
                        to="/"
                        className="btn w-full bg-[#F4AE33] text-[16px] border-none flex items-center justify-center"
                    >
                        <FaArrowLeft size={20} className="shrink-0" />
                        <span
                            className={`label-transition ml-2 ${isExpanded ? "label-visible" : "label-hidden"}`}
                        >
                            Return Home
                        </span>
                    </Link>
                </div>
            </aside>


            <div className="flex-1 flex flex-col min-w-0">

                <header className="h-16 bg-gray-900/80 backdrop-blur border-b border-gray-800/60 flex items-center justify-between px-4 shrink-0">
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

                    <div className="flex items-center gap-3">
                        <button className="w-9 h-9 rounded-lg bg-gray-800 border border-gray-700/60 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a1 1 0 10-2 0v.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        <div className="flex items-center gap-2.5 bg-gray-800/80 border border-gray-700/60 rounded-xl px-3 py-1.5">
                            <div className="w-7 h-7 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold shadow">
                                RH
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-xs font-semibold text-white leading-tight">Rahim Hossain</p>
                                <p className="text-[10px] text-gray-500 leading-tight">Admin</p>
                            </div>
                            <svg className="w-3 h-3 text-gray-500 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </header>


                <main className="min-h-screen p-5 bg-white">
                    <div>
                        <Outlet />
                    </div>
                </main>
            </div>


            {tooltip.visible && !isExpanded && (
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