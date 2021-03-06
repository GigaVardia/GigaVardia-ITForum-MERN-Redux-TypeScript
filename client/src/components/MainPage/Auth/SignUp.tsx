import React, {FC, useEffect, useState} from 'react';
import Modal from 'react-modal';
import {useActions} from "../../../hooks/useActions";
import {isPasswordsSame, isPasswordValid} from "../../../common/validators/PasswordValidator";
import {isEmailValid} from "../../../common/validators/EmailValidator";
import {useHttp} from "../../../hooks/useHttp";
import {useHistory} from 'react-router-dom'
import {useAlert} from "../../../hooks/UseAlert";
import {API} from "../../../config";

type propsTypes = {
    isOpen: boolean,
    element: string
}

type stateType = {
    username: string,
    email: string,
    password: string,
    confirm_password: string
}

const SignUp: FC<propsTypes> = ({isOpen, element}) => {
    const [form, setForm] = useState<stateType>({
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    })
    const {request} = useHttp()
    const [btnDisabled, setBtnDisabled] = useState(true)
    const {setSignUpClicked} = useActions()
    const history = useHistory()
    const SweetAlert = useAlert()

    const closeModal = () => {
        setSignUpClicked(false)
    }

    useEffect(() => {
        Modal.setAppElement(element)
    }, [element])

    useEffect(() => {
        if (
            form.username.length > 5 && form.password.length > 6 &&
            form.confirm_password.length > 6 && form.email.length > 5
        ) {
            setBtnDisabled(false)
        }
    }, [form])

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const fetchRegister = async (user: stateType) => {
        try {
            const data = await request(`${API}/api/auth/register`, 'POST', user);
            console.log(data)
            setSignUpClicked(false)
        } catch (e) {
            SweetAlert.fire({
                title: <p>Something went wrong. Try again...</p>
            })
            console.log(e, "Error, while register fetch...");
        }
    }

    const onClickSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (form.username.length > 15) {
            SweetAlert.fire({
                title: <p>Username length must be less than 15 symbols!</p>
            })
        }

        const comparePassword = isPasswordsSame(form.password, form.confirm_password);
        if (!comparePassword.isValid) {
            console.log(comparePassword.message)
            return
        }

        const passwordValidation = isPasswordValid(form.password);
        if (!passwordValidation.isValid) {
            console.log(passwordValidation.message)
            return
        }

        const emailValidation = isEmailValid(form.email);
        if (!emailValidation.isValid) {
            console.log(emailValidation.message)
            return
        }

        fetchRegister(form)
        history.go(0)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Sign Up"
            className="signUp"
            overlayClassName="signUp-overlay"
        >
            <form className="signUp-form">
                <label className="signUp-form-label">
                    Username
                    <input
                        className="signUp-form-label-input"
                        onChange={changeHandler}
                        type="text"
                        name="username"
                        value={form.username}
                    />
                </label>
                <label className="signUp-form-label">
                    Email
                    <input
                        className="signUp-form-label-input"
                        onChange={changeHandler}
                        type="email"
                        name="email"
                        value={form.email}
                    />
                </label>
                <label className="signUp-form-label">
                    Password
                    <input
                        className="signUp-form-label-input"
                        onChange={changeHandler}
                        type="password"
                        name="password"
                        value={form.password}
                    />
                </label>
                <label className="signUp-form-label">
                    Confirm password
                    <input
                        className="signUp-form-label-input"
                        onChange={changeHandler}
                        type="password"
                        name="confirm_password"
                        value={form.confirm_password}
                    />
                </label>
                <button
                    className="signUp-form-btn"
                    type="submit"
                    onClick={onClickSubmit}
                    disabled={btnDisabled}
                >
                    Sign Up
                </button>
            </form>
        </Modal>
    );
};

export default SignUp;