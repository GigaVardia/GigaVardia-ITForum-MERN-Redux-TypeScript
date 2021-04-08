import React, {FC} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";
import SignUp from "../Auth/SignUp";
import SignIn from "../Auth/SignIn";
import {useAuth} from "../../../hooks/useAuth";

const Header: FC = () => {
    const {signUpClicked, signInClicked} = useTypedSelector(state => state.mainInfo)
    const {isAuthenticated} = useTypedSelector(state => state.authentication)
    const {logout} = useAuth();
    const history = useHistory()
    const {setSignUpClicked, setSignInClicked, setIsAuthenticated} = useActions()

    const onClickNewPost = () => {
        if (!isAuthenticated) {
            alert("Sign in to create new post!")
        }
    }

    const onClickLogout = () => {
        logout()
        setIsAuthenticated(false)
        history.push('/')
    }

    const onClickLogo = () => {
        history.push("/")
    }

    const onClickSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setSignUpClicked(!signUpClicked)
    }

    const onClickSignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setSignInClicked(!signInClicked)
    }

    return (
        <header className="header header-outer">
            <SignUp isOpen={signUpClicked} element={'.header'}/>
            <SignIn isOpen={signInClicked} element={'.header'}/>
            <div className="header-inner container">
                <div className="header__logo"
                     onClick={onClickLogo}
                >
                    IT-FORUM
                </div>
                <nav className="header__nav">
                    <div className="header__nav-item">
                        <a
                            className="header__nav-item-link"
                            href="#!"
                        >
                            Home
                        </a>
                    </div>
                    <div className="header__nav-item">
                        <a
                            className="header__nav-item-link"
                            href="#!"
                        >
                            Forums
                        </a>
                    </div>
                    <div className="header__nav-item">
                        <Link
                            className="header__nav-item-link"
                            to="/newPost"
                            onClick={onClickNewPost}
                        >
                            New Post
                        </Link>
                    </div>
                </nav>

                <div className="header__right">
                    {
                        !isAuthenticated ?
                            <>
                                <button
                                    className="header__right-btn btn-signIn"
                                    onClick={onClickSignIn}
                                >
                                    Sign In
                                </button>
                                <button
                                    className="header__right-btn btn-signUp"
                                    onClick={onClickSignUp}
                                >
                                    Sign Up
                                </button>
                            </>
                            :
                            <button
                                className="header__right-btn btn-logout"
                                onClick={onClickLogout}
                            >
                                Log Out
                            </button>
                    }

                </div>
            </div>
        </header>
    );
};

export default Header;