import React, {FC, useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {useHttp} from "../../hooks/useHttp";
import {postsType} from "../../types/posts.type";
import Header from "../MainPage/Areas/Header";
import Footer from "../MainPage/Areas/Footer";
import Replies from "./Replies";
import {useAuth} from "../../hooks/useAuth";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAlert} from "../../hooks/UseAlert";

type paramsType = {
    id: string
}

const initialPost = {
    postAuthor: "",
    postTitle: "",
    postBody: "",
    date: "",
    postReplies: [],
    id: ""
}

const PostPage: FC = () => {
    const {request, loading} = useHttp()
    const [post, setPost] = useState<postsType>(initialPost)
    const {token, userId} = useAuth()
    const {id}: paramsType = useParams()
    const [reply, setReply] = useState("")
    const {isAuthenticated} = useTypedSelector(state => state.authentication)
    const Alert = useAlert()

    const fetchPost = useCallback(async () => {
        try {
            const response = await request(`/api/posts/${id}`)

            return response.data
        } catch (e) {
            console.log("Error fetching post...", e)
        }
    }, [id, request])

    const onChangeReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReply(e.target.value)
    }

    const onClickReply = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (!isAuthenticated) {
            await Alert.fire({
                title: <p>Sign In to reply!</p>,
            })
            return
        }

        try {
            const data = await request('/api/posts/addReply', 'POST', {
                postId:id,
                userId,
                reply
            }, {
                authorization: `Bearer ${token}`
            })

            if (data.msg === "New Reply!") {
                setReply("")
            }
            window.location.reload()
        } catch (e) {
            console.log("Error while reply...", e)
        }
    }

    useEffect(() => {
        let isMounted = true

        if (isMounted) {
            fetchPost().then(data => {
                setPost(data)
            })
        }

        return () => {isMounted=false}
    }, [fetchPost])

    return (
        <div className="wrapper">
            <Header/>
                <div className="postPage postPage-outer">
                    <div className="postPage-inner container">
                        <div className="postPage__author">
                            {loading? <>Loading...</> : <>{post.postAuthor}</>}
                        </div>
                        <div className="postPage__title">
                            {loading? <>Loading...</> : <>{post.postTitle}</>}
                        </div>
                        <div className="postPage__body">
                            {loading? <>Loading...</> : <>{post.postBody}</>}
                        </div>
                        <div className="postPage__replies">
                            <div className="postPage__replies-inner">
                                {
                                    loading ? null : post.postReplies.length > 0 ?
                                        <Replies replies={post.postReplies}/>
                                        : null
                                }
                            </div>
                        </div>
                        <div className="postPage__newReply">
                            <textarea
                                className="postPage__newReply-textArea"
                                onChange={onChangeReply}
                                value={reply}
                            >

                            </textarea>
                            <button
                                className="postPage__newReply-btn"
                                onClick={onClickReply}
                            >
                                Reply
                            </button>
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    );
};

export default PostPage;