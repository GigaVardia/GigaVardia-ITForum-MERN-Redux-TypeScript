import React, {FC, useEffect, useState} from 'react';
import ReactModal from "react-modal";
import Modal from "react-modal";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useHttp} from "../../../hooks/useHttp";

type propsTypes = {
    isOpen: boolean,
    element: string
}

type stateType = {
    username: string,
    password: string
}

type requestData = {
    token: string,
    userId: string
}

const SignIn: FC<propsTypes> = ({isOpen, element}) => {
    const [form, setForm] = useState<stateType>({
        username: "",
        password: ""
    })
    const {request} = useHttp()
    const {login} = useTypedSelector(state => state.authentication)
    const [btnDisabled, setBtnDisabled] = useState(true)

    const {setSignInClicked} = useActions()

    useEffect(() => {
        Modal.setAppElement(element)
    }, [element])

    useEffect(() => {
        if (form.password.length > 6 && form.username.length > 0) {
            setBtnDisabled(false)
        }
    }, [form])

    const closeModal = () => {
        setSignInClicked(false)
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const onClickSignIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        try {
            const data: requestData = await request('/api/auth/login', 'POST', {...form})
            if (login) {
                login(data.token, data.userId)
            }

            setSignInClicked(false)
        } catch (e) {
            console.log(e, "Error while login fetch...")
        }
    }

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Sign In"
            className="signIn"
            overlayClassName="signIn-overlay"
        >
            <form className="signIn-form">
                <label className="signIn-form-label">
                    Username
                    <input
                        className="signIn-form-label-input"
                        onChange={changeHandler}
                        value={form.username}
                        name="username"
                        type="text"
                    />
                </label>
                <label className="signIn-form-label">
                    Password
                    <input
                        className="signIn-form-label-input"
                        onChange={changeHandler}
                        value={form.password}
                        name="password"
                        type="password"
                    />
                </label>
                <button
                    className="signIn-form-btn"
                    onClick={onClickSignIn}
                    disabled={btnDisabled}
                >
                    Sign In
                </button>
            </form>
        </ReactModal>
    );
};

export default SignIn;