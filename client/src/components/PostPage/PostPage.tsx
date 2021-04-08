import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {useHttp} from "../../hooks/useHttp";
import {postsType} from "../../types/posts.type";
import Header from "../MainPage/Areas/Header";
import Footer from "../MainPage/Areas/Footer";
import {useAuth} from "../../hooks/useAuth";

type paramsType = {
    id: string
}

const initialPost = {
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

    const fetchPost = async () => {
        try {
            const response = await request(`/api/posts/${id}`)

            return response.data
        } catch (e) {
            console.log("Error fetching post...", e)
        }
    }

    const onChangeReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReply(e.target.value)
    }

    const onClickReply = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        try {
            const data = await request('/api/posts/addReply', 'POST', {
                postId:id,
                userId,
                reply
            }, {
                authorization: `Bearer ${token}`
            })

            setReply("")
            console.log(data)
        } catch (e) {
            console.log("Error while reply...", e)
        }
    }

    useEffect(() => {
        let isMounted = true

        if (isMounted) {
            fetchPost().then(data => {
                setPost(data[0])
            })
        }

        return () => {isMounted=false}
        // eslint-disable-next-line
    }, [request])

    return (
        <>
            <Header/>
                <div className="postPage postPage-outer">
                    <div className="postPage-inner container">
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
                                        post.postReplies.map((item, index) => {
                                            return (
                                                <div
                                                    className="postPage__replies-item"
                                                    key={`${item.replyAuthorId}-${index}`}>
                                                    <div className="postPage__replies-item-replyAuthor">
                                                        {item.replyAuthor}
                                                    </div>
                                                    <div className="postPage__replies-item-reply">
                                                        {item.reply}
                                                    </div>
                                                </div>
                                            )
                                        })
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
        </>
    );
};

export default PostPage;