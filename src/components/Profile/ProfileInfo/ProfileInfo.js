import c from './ProfileInfo.module.css'
import noPhoto from '../../../assets/images/noPhoto.png'
import preloader from '../../../assets/images/preloader.svg'
import ProfileStatus from './ProfileStatus'


const ProfileInfo = (props) => {
    if (!props.profile) {
        return (
            <div>
                <img alt='placeholder' src={preloader} />
            </div>
        )
    }

    const onMainPhotoSelected = (e) => {
        props.savePhoto(e.target.files[0])
    }

    return (
        <>

            <div className={c.profile__profile}>
                <div className={c.profile__avatar}>
                    <img alt='profile.avatar'
                        className={c.profile__avatar_img}
                        src={props.profile.photos.large ? props.profile.photos.large : noPhoto}
                    />
                    {props.isOwner && 
                    <label className={c.avatar_change}>
                        <input onChange={onMainPhotoSelected} type={"file"} />
                        Изменить аватар
                    </label>
                    }
                </div>
                <div className={c.profile__info}>
                    <h4 className={c.profile__infoHeader}> {props.profile.fullName}</h4>
                    <ProfileStatus status={props.status} className='aaa' updateStatus={props.updateStatus} isOwner={props.isOwner}/>
                </div>
            </div>
            <div className={c.aboutMe}> <p className={c.description} >Обо мне:</p> {props.profile.aboutMe || '------'}</div>
            <div>
                <p className={c.description}>мои Социальные Сети:</p>
                <p>instagram:   {props.profile.contacts.instagram || '------'}</p>
                <p>vk:   {props.profile.contacts.vk || '------'}</p>
                <p>facebook:   {props.profile.contacts.facebook || '------'}</p>
                <p>github:  {props.profile.contacts.github || '------'}</p>
            </div>
        </>
    )
}

export default ProfileInfo;