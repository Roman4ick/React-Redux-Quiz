import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import { connect } from 'react-redux';
import {auth} from '../../store/actions/auth'


class Auth extends Component {

    state = {
        isFormValid: false,
        formConrols: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный Email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }

    }
}
    loginHandler = () => {
        this.props.auth(
            this.state.formConrols.email.value,
            this.state.formConrols.password.value,
            true
        )       
    }
    registerHandler = () => {
        this.props.auth(
            this.state.formConrols.email.value,
            this.state.formConrols.password.value,
            false
        )       
    }
    submitHandler = event => {
        event.preventDefault()
    }
    validateControl(value, validation) {
        if (!validation) {
            return true
        }
        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = is.email(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid 
        }

        return isValid
    }
    onChangeHandler = (event, controlName) => {
        const formConrols = { ...this.state.formConrols }
        const control = { ...formConrols[controlName] }
        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formConrols[controlName] = control

        let isFormValid = true
        Object.keys(formConrols).forEach(name => {
            isFormValid = formConrols[name].valid && isFormValid
        })
        this.setState({
            formConrols, isFormValid
        })
    }
    renderInouts() {
        return Object.keys(this.state.formConrols).map((controlName, index) => {
            const control = this.state.formConrols[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        { this.renderInouts() }
                        <Button
                            type='success'
                            onClick={this.loginHandler}
                            disabled={ !this.state.isFormValid }
                        >
                            Войти
                            </Button>
                        <Button
                            type='primary'
                            onClick={this.registerHandler}
                            disabled={ !this.state.isFormValid }
                        >
                            Зарегистрироваться
                            </Button>
                    </form>
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)