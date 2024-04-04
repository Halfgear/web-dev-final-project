import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", dob: "", email: "", role: "USER"
    });
    const save = async () => {
        await client.updateUser(profile);
    };

    const navigate = useNavigate();
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };
    const signout = async () => {
        await client.signout();
        navigate("/Kanbas/Account/Signin");
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <h1>Profile</h1>
                <button onClick={save} className="btn btn-primary" style={{ marginLeft: "20px", marginRight: "20px" }}>
                    Save
                </button>
                <button onClick={signout} className="btn btn-danger" >
                    Signout
                </button>
            </div>
            <Link to="/Kanbas/Account/Admin/Users"
                className="btn btn-warning w-100">
                Users
            </Link>

            {profile && (
                <div>
                    <label>Username: </label>
                    <input value={profile.username} onChange={(e) =>
                        setProfile({ ...profile, username: e.target.value })} />
                    <br />
                    <label>Password: </label>
                    <input value={profile.password} onChange={(e) =>
                        setProfile({ ...profile, password: e.target.value })} />
                    <br />
                    <label>First Name: </label>
                    <input value={profile.firstName} onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })} />
                    <br />
                    <label>Last Name: </label>
                    <input value={profile.lastName} onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })} />
                    <br />
                    <label>Date of Birth: </label>
                    <input value={profile.dob} type="date" onChange={(e) =>
                        setProfile({ ...profile, dob: e.target.value })} />
                    <br />
                    <label>Email: </label>
                    <input value={profile.email} onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })} />
                    <br />
                    <label>Role:</label>
                    <select onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                </div>
            )}
        </div>
    );
}