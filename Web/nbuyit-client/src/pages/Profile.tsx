import { useAuth0 } from "@auth0/auth0-react";
import ProfileCard from "../components/ProfileCard";

function Profile() {
    const { isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <div className="flex items-center justify-center h-screen bg-gray-200">
                <ProfileCard />
            </div>
        )
      );
}

export default Profile;