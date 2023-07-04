import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import c from './Login.module.css'
import { Input } from '../common/FormsControls';
import { required } from '../../utils/validators';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';
import { appStateType } from '../../redux/reduxStore';

type loginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<loginFormValuesType, loginFormOwnProps> & loginFormOwnProps> = (props) => {
    return (
        <form className={c.form} onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'login'}
                    name={'email'}
                    className={c.formInput}
                    component={Input}
                    validate={[required]} />
            </div>
            <div>
                <Field placeholder={'password'}
                    type={'password'}
                    name={'password'}
                    className={c.formInput}
                    component={Input}
                    validate={[required]} />
            </div>
            <div className={c.checkboxText}>
                <Field type='checkbox'
                    name={'rememberMe'}
                    className={c.checkbox}
                    component={'input'} />
                remember me
            </div>

            {props.captchaUrl && <img alt='captcha' src={props.captchaUrl}/>}
            {props.captchaUrl && <div>
                <Field placeholder={'Введите символы с картинки'}
                    name={'captcha'}
                    className={c.formInput}
                    component={'input'} />
            </div>}

            <div className={c.from_summary_error}>
                {props.error}
            </div>
            <div className={c.btnContainer}>
                <button className={c.submitBtn} >Login</button>
            </div>
            {/* <a className={c.reg}
                href='https://social-network.samuraijs.com/signUp'>
                register here
            </a> */}
        </form>
    )
}

const LoginReduxForm = reduxForm<loginFormValuesType, loginFormOwnProps>(
    {form: 'login'}
)(LoginForm)

type mapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type mapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: any) => void
}

type loginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

const Login: React.FC<mapStatePropsType & mapDispatchPropsType> = (props) => {
    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return (
            <Navigate to='/profile' />
        )
    }

    return (
        <div className={c.container}>
            <h1 className={c.header}>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl = {props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state:appStateType):mapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})

export default connect(mapStateToProps, { login, logout })(Login)