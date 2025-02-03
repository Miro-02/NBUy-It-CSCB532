import ProfileCard from "../components/ProfileCard";
import { useAuth } from "../auth/AuthContext";

function Profile() {
    const { isAuthenticated } = useAuth();

    return (
        isAuthenticated && (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-[#093f87]">
                <ProfileCard />
            </div>
        )
      );
}

export default Profile;