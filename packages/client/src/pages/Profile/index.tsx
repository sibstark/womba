import { ProfileForm } from "../../containers/Profile/profile";
import "./styles.scss";

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <h3>Профиль</h3>
            <ProfileForm />
        </div>
    );
};

export default ProfilePage;
