import PostsContainer from './posts/postsContainer';
import c from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {

    return (
        <section className={c.profile}>

            <ProfileInfo profile = {props.profile} 
            updateStatus = {props.updateStatus}
            isOwner={props.isOwner}
            status = {props.status}
            savePhoto = {props.savePhoto}
            saveProfile = {props.saveProfile} />

            {/* <PostsContainer/> */}

        </section>
    )
}

export default Profile;