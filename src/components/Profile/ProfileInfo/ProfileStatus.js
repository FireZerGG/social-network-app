import React, { useEffect, useState } from "react"
import c from './ProfileInfo.module.css'

const ProfileStatus = (props) => {

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
        props.updateStatus(status);
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <>
            {!editMode
                ? <div style={{ minWidth: '10px', minHeight: '10px' }} >
                    <span className={c.status} onDoubleClick={activateEditMode} title="Изменить статус">
                        <div className={c.description} >status:</div> {props.status || '------'}
                    </span>
                </div>

                : <div>
                    <input
                        value={status}
                        onChange={onStatusChange}
                        onBlur={deactivateEditMode}
                        autoFocus={true} />
                </div>
            }
        </>
    );
};

export default ProfileStatus;