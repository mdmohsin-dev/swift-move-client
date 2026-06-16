import { FaFacebookF, FaLinkedinIn, FaInstagram, FaApple, FaGooglePlay } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../../assets/courier-logo.png";
import nameLogo from "../../assets/MoveFastLogo.png"

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-36">
            <div className="max-w-350 w-11/12 mx-auto pt-14 pb-5">

                {/* Main grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Col 1 — Brand */}
                    <div className="flex flex-col gap-4">
                        <Link to="/" className="flex items-center gap-1">
                            <img src={logo} className="w-10" alt="" />
                            <img src={nameLogo} className="w-32" alt="" />
                        </Link>
                        <div className="text-gray-500 text-sm leading-relaxed">
                            <p>House# 44, Rd No. 2/A, Dhanmondi,</p>
                            <p>Dhaka 1209</p>
                            <p className="mt-2">E-mail: info@movefast.com.bd</p>
                            <p>Hotline: 09678-045045</p>
                        </div>
                    </div>

                    {/* Col 2 — Company */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-black font-bold text-xl">Company</h4>
                        <ul className="flex flex-col gap-3 text-gray-500 text-sm">
                            <li>
                                <Link to="/contact" className="hover:text-black transition-colors duration-200">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="hover:text-black transition-colors duration-200">
                                    Terms and Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3 — Sister Concern */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-black font-bold text-xl">Sister Concern</h4>
                        <ul className="flex flex-col gap-3 text-gray-500 text-sm">
                            <li>
                                <a href=""
                                    href="https://pixelax.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-black transition-colors duration-200"
                                >
                                    Pixelax
                                </a>
                            </li>
                            <li>
                                <a href=""
                                    href="https://biggapon.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-black transition-colors duration-200"
                                >
                                    Biggapon
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 4 — Follow Us + App Buttons */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-black font-bold text-xl">Follow Us</h4>

                        {/* Social icons */}
                        <div className="flex items-center gap-3">
                            <a href=""
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-all duration-200" >
                                <FaFacebookF size={14} />
                            </a>
                            <a href=""
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-all duration-200"
                            >
                                <FaLinkedinIn size={14} />
                            </a>
                            <a href=""
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-black hover:text-black transition-all duration-200"
                            >
                                <FaInstagram size={14} />
                            </a>
                        </div>

                        {/* App store buttons */}
                        <div className="flex gap-3 mt-2">

                            {/* App Store */}
                            <a href=""
                                href="#"
                                className="flex items-center gap-2 bg-black text-white px-3 py-1 hover:bg-gray-800 transition-colors duration-200 rounded-lg"
                            >
                                <FaApple size={26} />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400">Download on the</span>
                                    <span className="font-semibold text-sm">App Store</span>
                                </div>
                            </a>

                            {/* Google Play */}
                            <a href=""
                                href="#"
                                className="flex items-center gap-3 bg-black text-white px-3 rounded-lg w-fit hover:bg-gray-800 transition-colors duration-200 py-1"
                            >
                                <FaGooglePlay size={22} />
                                <div className="flex flex-col leading-tight">
                                    <span className="text-[10px] text-gray-400 font-light">GET IT ON</span>
                                    <span className="text-sm font-semibold tracking-wide">Google Play</span>
                                </div>
                            </a>

                        </div>
                    </div>

                </div>

                {/* Divider + Copyright */}
                <div className="border-t border-gray-100 mt-12 pt-6 text-center font-semibold text-sm">
                    © 2024 - 2026 MoveFast Courier Ltd. All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;