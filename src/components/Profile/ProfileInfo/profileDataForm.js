import { Field, reduxForm } from "redux-form"
import c from './ProfileInfo.module.css'
import { required } from '../../../utils/validators';
import { Input } from "../../common/FormsControls";

const ProfileDataForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={c.profileForm}>

            <div className={c.form_container}>
                <div>
                    <div>
                        <b className={c.input_description}>Имя</b>
                        <Field name={'fullName'} component={Input}
                            className={c.formInput} validate={[required]}
                            placeholder={'обязательное поле'} />
                    </div>
                    <div>
                        <b className={c.input_description}>Обо мне</b>
                        <Field name={'aboutMe'} component={Input}
                            className={c.formInput} validate={[required]}
                            placeholder={'обязательное поле'} />
                    </div>
                    <div>
                        <b className={c.input_description}>Навыки</b>
                        <Field name={'lookingForAJobDescription'}
                            component={Input} validate={[required]}
                            className={c.formInput}  placeholder={'обязательное поле'}/>
                        <div className={c.form_job}>
                            <b>в поиске работы?*</b>
                            <Field name={'lookingForAJob'} component={Input} type={'checkbox'}
                                className={c.formCheckbox} validate={[required]} 
                                placeholder={'обязательное поле'} />
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <b className={c.input_description}>instagram</b>
                        <Field name={"contacts.instagram"}
                            component={'input'}
                            className={c.formInput} />
                    </div>
                    <div>
                        <b className={c.input_description}>vk</b>
                        <Field name={"contacts.vk"} component={'input'}
                            className={c.formInput} />
                    </div>
                    <div>
                        <b className={c.input_description}>facebook</b>
                        <Field name={'contacts.facebook'} component={'input'}
                            className={c.formInput} />
                    </div>
                    <div>
                        <b className={c.input_description}>github</b>
                        <Field name={'contacts.github'} component={'input'}
                            className={c.formInput} />
                    </div>
                </div>
            </div>

            <button className={c.profileForm_submit}>
                Подтвердить
            </button>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm({ form: 'editProfile' })(ProfileDataForm)

export default ProfileDataReduxForm