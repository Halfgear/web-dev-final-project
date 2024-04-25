import { Link, useLocation } from "react-router-dom";
function QuizNav() {
    const { pathname } = useLocation();
    const newPath = pathname.substring(0, pathname.lastIndexOf("/"));

    return (
        <nav className="nav nav-tabs mt-2">
            <Link  to={newPath + "/Details"} 
                className={`nav-link ${pathname.includes("Details") ? "active" : ""}`}>Details</Link>
            <Link  to={newPath + "/Question"}  
                className={`nav-link ${pathname.includes("Question") ? "active" : ""}`}>Question</Link>
        </nav>
    );
}
export default QuizNav;