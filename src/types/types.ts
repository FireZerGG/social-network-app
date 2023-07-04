export type photosType = {
    large: string | null
    small: string | null
}

export type contactsType = {
    facebook: string
    github: string
    instagram: string
    mainLink: string
    twitter: string
    vk: string
    website: string
    youtube: string
}

export type profileType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
}

export type userType = {
    name: string
    id: number
    photos: photosType
    status: string
    followed: boolean
}