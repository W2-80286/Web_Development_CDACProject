import { useState, useEffect } from "react";
import axios from "axios";
import "./widgetSm.css";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function WidgetsSm () {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:4001/user");
                setUsers(response.data.data || []);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const latestUsers = users.slice(0, 5); // Slice to get only the first 5 users

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Member</span>
            <ul className="widgetSmList">
                {latestUsers.map((user, index) => (
                    <li key={index} className="widgetSmListItem">
                        <img
                            src={user.profilePic || "https://via.placeholder.com/150"}
                            alt={`User ${index + 1}`}
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.firstName} {user.lastName}</span>
                            <span className="widgetSmUserTitle">{user.jobTitle}</span>
                        </div>
                        <button className="widgetSmButton">
                            <VisibilityIcon className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
