import c from './ProfileInfo.module.css'
import UserDefaultAvatar from '../../../assets/images/userDefaultAvatar.jpg'
import preloader from '../../../assets/images/preloader.svg'
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'


const ProfileInfo = (props) => {
    if (!props.profile) {
        return (
            <div>
                <img alt='placeholder' src={preloader}/> 
            </div>
        )
    }
    return (
        <>

            <div className={c.profile__profile}>
                <div className={c.profile__avatar}>
                    <img alt='profile.avatar'
                    className={c.profile__avatar_img} 
                    src={props.profile.photos.small ? props.profile.photos.small : UserDefaultAvatar } />
                </div>
                <div className={c.profile__info}>
                    <h4 className={c.profile__infoHeader}> {props.profile.fullName}</h4>
                    <ul className={c.profile__infoList}>
                        <li>{props.profile.aboutMe}</li>
                        <li>{props.profile.lookingForAJobDescription}</li>
                    </ul>
                    <ProfileStatusWithHooks status = {props.status} updateStatus = {props.updateStatus}/>
                </div>
            </div>
        </>
    )
}

export default ProfileInfo;