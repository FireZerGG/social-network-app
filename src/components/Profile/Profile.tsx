import { profileType } from '../../types/types';
import c from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type propsType = {
    profile: profileType | null
    isOwner: boolean
    status: string
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => void
    updateStatus: (status: string ) => void

}

const Profile: React.FC<propsType> = (props) => {

    return (
        <section className={c.profile}>

            <ProfileInfo profile = {props.profile} 
            updateStatus = {props.updateStatus}
            isOwner={props.isOwner}
            status = {props.status}
            savePhoto = {props.savePhoto}
            saveProfile = {props.saveProfile} />

        </section>
    )
}

export default Profile;