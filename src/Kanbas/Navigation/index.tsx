import { Link, useLocation } from "react-router-dom";
import "./index.css";
import "./index.css";
import {
    FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaEnvelope, FaHistory,
    FaDesktop, FaShareSquare, FaQuestionCircle
} from "react-icons/fa";

function KanbasNavigation() {
    const links = [
        { label: "Account", icon: <FaRegUserCircle className="profile-icon" /> },
        { label: "Dashboard", icon: <FaTachometerAlt className="red-icon" /> },
        { label: "Courses", icon: <FaBook className="red-icon" /> },
        { label: "Calendar", icon: <FaRegCalendarAlt className="red-icon" /> },
        { label: "Inbox", icon: <FaEnvelope className="red-icon" /> },
        { label: "History", icon: <FaHistory className="red-icon" /> },
        { label: "Studio", icon: <FaDesktop className="red-icon" /> },
        { label: "Commons", icon: <FaShareSquare className="red-icon" /> },
        { label: "Help", icon: <FaQuestionCircle className="help-icon" /> }
    ];
    const { pathname } = useLocation();
    return (
        <ul className="wd-kanbas-navigation">
            <li>
                <img src="/images/northeastern.png" alt="Northeastern Logo" className="wd-northeastern-center" />
            </li>
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                    <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label} </Link>
                </li>
            ))}
        </ul>
    );
}
export default KanbasNavigation;