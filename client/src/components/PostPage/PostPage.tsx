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
import Pagination from "./Pagination";
import {API} from "../../config";

type paramsType = {
    id: string
}

const initialPost: postsType = {
    postAuthor: "",
    postTitle: "",
    postBody: "",
    date: "",
    postReplies: [{replyAuthor: "", replyAuthorId: "", reply: "", date:""}],
    id: ""
}

const PostPage: FC = () => {
    const {request, loading} = useHttp()
    const [post, setPost] = useState<postsType>(initialPost)
    const {token, userId} = useAuth()
    const {id}: paramsType = useParams()
    const [reply, setReply] = useState("")
    const [clickedReply, setClickedReply] = useState(1)
    const {isAuthenticated} = useTypedSelector(state => state.authentication)
    const [replyPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1)
    const Alert = useAlert()

    const fetchPost = useCallback(async () => {
        try {
            const response = await request(`${API}/api/posts/${id}`)

            return response.data
        } catch (e) {
            console.log("Error fetching post...", e)
        }
    }, [id, request])

    useEffect(() => {
        let isMounted = true

        if (isMounted) {
            fetchPost().then((data: postsType) => {
                setPost(data)
            })
        }

        return () => {isMounted=false}
    }, [fetchPost, clickedReply])

    if (loading) {
        return (
            <div className="wrapper">
                <Header/>
                <div className="loading">

                </div>
                <Footer/>
            </div>
        )
    }

    // Pagination
    const totalReplies = post.postReplies.length;
    const indexOfLastReply = currentPage * replyPerPage;
    const indexOfFirstReply = indexOfLastReply - replyPerPage;
    const currentReplies = post.postReplies.slice(indexOfFirstReply, indexOfLastReply);
    const howManyPages = Math.ceil(totalReplies/replyPerPage);

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
            const data = await request(`${API}/api/posts/addReply`, 'POST', {
                postId:id,
                userId,
                reply
            }, {
                authorization: `Bearer ${token}`
            })

            if (data.msg === "New Reply!") {
                setReply("")
            }
            setClickedReply(clickedReply+1);
        } catch (e) {
            console.log("Error while reply...", e)
        }
    }

    return (
        <div className="wrapper">
            <Header/>
                <div className="postPage postPage-outer">
                    <div className="postPage-inner container">
                        <div className="postPage__author">
                            {post.postAuthor}
                        </div>
                        <div className="postPage__title">
                            {post.postTitle}
                        </div>
                        <div className="postPage__body">
                            {post.postBody}
                        </div>
                        <div className="replies">
                            <div className="replies-inner">
                                {
                                    totalReplies > 0 ?
                                        <Replies replies={currentReplies}/>
                                        : null
                                }
                            </div>
                        </div>
                        {howManyPages > 1 ? <Pagination pages={howManyPages} setCurrentPage={setCurrentPage}/> : null}
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