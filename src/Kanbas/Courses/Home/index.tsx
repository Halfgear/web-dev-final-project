import ModuleList from "../Modules/List";
import "./index.css";
function Home() {
    return (
        <div className="App">
            <div className="d-flex">
                <div className="flex-fill">
                    <ModuleList />
                </div>
                <div className="flex-grow-0 me-2 d-none d-lg-block" style={{ width: '250px', marginLeft: '20px' }}>
                    <br />
                    <ul className="course-options-list">
                        <li><a href="/Kanbas/Courses"> Import Existing Content</a></li>
                        <li><a href="/Kanbas/Courses"> Import From Commons</a></li>
                        <li><a href="/Kanbas/Courses"> Choose Home Page</a></li>
                        <li><a href="/Kanbas/Courses"> View Course Stream</a></li>
                        <li><a href="/Kanbas/Courses"> New Announcement</a></li>
                        <li><a href="/Kanbas/Courses"> New Analytics</a></li>
                        <li><a href="/Kanbas/Courses"> View Course Notifications</a></li>
                    </ul>
                    <br />
                    <h3>To Do</h3>
                    <hr />
                    <ul>
                        <li><a href="/Kanbas/Courses"> Grade A1- Env + HTML</a></li>
                        <li><a href="/Kanbas/Courses"> Grade A2 - CSS + BOOTSTRAP</a></li>
                    </ul>
                </div>
            </div>
        </div >
    );
}
export default Home;