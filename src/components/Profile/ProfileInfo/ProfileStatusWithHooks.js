import React, { useEffect, useState } from "react"

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
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
                    <span onDoubleClick={activateEditMode}>
                        {props.status || 'no status'}
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

export default ProfileStatusWithHooks;