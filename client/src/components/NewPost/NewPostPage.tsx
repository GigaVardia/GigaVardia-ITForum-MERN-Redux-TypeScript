import React, {useState} from 'react';
import {Topics} from "../../common/Topics"
import {TopicsTypes} from "../../types/topicsType";
import {useHistory} from 'react-router-dom'
import {useHttp} from "../../hooks/useHttp";
import {useAuth} from "../../hooks/useAuth";
import Header from "../MainPage/Areas/Header";
import Footer from "../MainPage/Areas/Footer";
import Select from 'react-select'

const options = [
    { value: TopicsTypes.WEB_DEV, label: Topics.WebDev},
    { value: TopicsTypes.GAME_DEV, label: Topics.GameDev },
    { value: TopicsTypes.DATA_ANALYSE, label: Topics.DataAnalyse },
    { value: TopicsTypes.EMB_SYS_DEV, label: Topics.EmbSysDev },
    { value: TopicsTypes.MOB_DEV, label: Topics.MobDev },
    { value: TopicsTypes.OTHERS, label: Topics.Others },
]

const NewPostPage: React.FC = () => {
    const [title, setTitle] = useState<string>("")
    const [post, setPost] = useState<string>("")
    const [topic, setTopic] = useState({value: "", label: ""})
    const {token} = useAuth()
    const history = useHistory()

    const {request} = useHttp()

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const onChangePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPost(e.target.value)
    }

    const onChangeSelect = (selectedOption: any) => {
        setTopic(selectedOption)
    }

    const onClickNewPost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        try {
            const data = await request('/api/posts/newPost', 'POST', {
                title,
                body: post,
                topic: topic?.value,
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
        <>
        <Header/>
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

                        <Select
                            className="newPost-form__select"
                            onChange={onChangeSelect}
                            options={options}
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
            <Footer/>
        </>
    );
};

export default NewPostPage;