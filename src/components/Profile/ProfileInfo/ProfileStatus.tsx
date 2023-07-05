import React, { ChangeEvent, useEffect, useState } from "react"
import c from './ProfileInfo.module.css'

type propsType = {
    status: string | null
    isOwner: boolean
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<propsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        if (!props.isOwner) {
            return
        }
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status as string);
    };

    const onStatusChange = (e:React.FormEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <>
            {!editMode
                ? <div style={{ minWidth: '10px', minHeight: '10px' }} >
                    <span className={c.status} onDoubleClick={activateEditMode} title="Изменить статус">
                        <b >status:</b> {props.status || '------'}
                    </span>
                </div>

                : <div>
                    <input
                        onChange={onStatusChange}
                        value={status as string }
                        onBlur={deactivateEditMode}
                        autoFocus={true} />
                </div>
            }
        </>
    );
};

export default ProfileStatus;