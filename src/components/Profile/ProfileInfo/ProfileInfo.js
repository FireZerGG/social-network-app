import React, { useState } from "react"
import c from './ProfileInfo.module.css'
import noPhoto from '../../../assets/images/noPhoto.png'
import preloader from '../../../assets/images/preloader.svg'
import ProfileStatus from './ProfileStatus'
import ProfileDataForm from "./profileDataForm"

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

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

    const onSubmit = (formData) => {
        props.saveProfile(formData);
        setEditMode(false)
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
                    <ProfileStatus status={props.status} className='aaa' updateStatus={props.updateStatus} isOwner={props.isOwner} />
                </div>
            </div>

            {editMode
                ? <ProfileDataForm {...props} onSubmit={onSubmit} initialValues={props.profile}/>
                : <ProfileData {...props} goToEditMode={() => {
                    setEditMode(true)
                }} />}
        </>
    )
}

const ProfileData = (props) => {
    return (
        <>
            <div className={c.aboutMe}> <b>Обо мне:</b> {props.profile.aboutMe || '------'}</div>
            <div className={c.job}>
                {props.profile.lookingForAJob
                    ? <p><b>В поиске работы</b></p>
                    : <p><b>не ищу работу</b></p>
                }
                <p>Что я умею: {props.profile.lookingForAJobDescription}</p>
            </div>
            <div className={c.social}>
                <b>мои Социальные Сети:</b>
                <p>instagram:   {props.profile.contacts.instagram || '------'}</p>
                <p>vk:   {props.profile.contacts.vk || '------'}</p>
                <p>facebook:   {props.profile.contacts.facebook || '------'}</p>
                <p>github:  {props.profile.contacts.github || '------'}</p>
            </div>

            {props.isOwner &&
                <button onClick={props.goToEditMode} className={c.setProfileBtn}>
                    Изменить профиль
                </button>}
        </>
    )
}

export default ProfileInfo;