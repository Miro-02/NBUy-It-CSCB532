import { useAuth0 } from "@auth0/auth0-react";
import ProfileCard from "../components/ProfileCard";

function Profile() {
    const { isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-[#093f87]">
                <ProfileCard />
            </div>
        )
      );
}

export default Profile;