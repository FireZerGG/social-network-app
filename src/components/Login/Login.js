import { Field, reduxForm } from 'redux-form';
import c from './Login.module.css'
import { Input } from '../common/FormsControls';
import { required } from '../../utils/validators';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';

const LoginForm = (props) => {
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
                type = {'password'}
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
            <div className={c.from_summary_error}>
                {props.error}
            </div>
            <div>
                <button className={c.submitBtn} >Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
}) (LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    
    if (props.isAuth) {
        return (
            <Navigate to = '/profile' />
        )
    }

    return (
        <div className={c.container}>
            <h1 className={c.header}>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect (mapStateToProps, {login, logout}) (Login)