import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {useHttp} from "../../hooks/useHttp";
import {useAuth} from "../../hooks/useAuth";

const NewPostPage: React.FC = () => {
    const [title, setTitle] = useState<string>("")
    const [post, setPost] = useState<string>("")
    const {token} = useAuth()
    const history = useHistory()

    const {request} = useHttp()

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const onChangePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPost(e.target.value)
    }

    const onClickNewPost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        try {
            const data = await request('/api/posts/newPost', 'POST', {
                title,
                body: post,
                topic: "Web Dev"
            }, {
                authorization: `Bearer ${token}`
            })

            console.log(data)
            history.push("/")
        } catch (e) {
            console.log(e, "Error while adding new post...")
        }
    }

    return (
        <section className="newPost newPost-outer">
            <div className="newPost-inner container">
                <form className="newPost-form">
                    <div className="newPost-form__title">
                        Enter post title
                    </div>
                    <input
                        className="newPost-form__input"
                        type="text"
                        value={title}
                        onChange={onChangeTitle}
                    />

                    <textarea
                        className="newPost-form__textArea"
                        name="textArea"
                        value={post}
                        onChange={onChangePost}
                        placeholder="Enter your post..."
                    >
                    </textarea>
                    <button
                        className="newPost-form__btn"
                        onClick={onClickNewPost}
                    >
                        Add new post
                    </button>
                </form>
            </div>
        </section>
    );
};

export default NewPostPage;