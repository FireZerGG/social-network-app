import React from "react"

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }


    activateEditMode = () => {
        this.setState( {
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState( {
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e) => {
        this.setState( {
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <>
                {!this.state.editMode
                    ? <div style={{minWidth: '10px', minHeight: '10px'}} >
                        <span onDoubleClick={this.activateEditMode} >{this.props.status || 'no status' }</span>
                    </div>

                    : <div>
                        <input value={this.state.status} 
                            onChange={this.onStatusChange}
                            autoFocus = {true}
                            onBlur={this.deactivateEditMode} />
                    </div>
                }
            </>
        )
    }
}

export default ProfileStatus