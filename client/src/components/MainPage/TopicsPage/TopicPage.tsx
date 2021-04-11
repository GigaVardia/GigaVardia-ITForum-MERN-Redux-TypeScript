import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Topics} from "../../../common/Topics"
import {TopicsTypes} from "../../../types/topicsType"
import Header from "../Areas/Header";
import Footer from "../Areas/Footer";
import {Link} from "react-router-dom";
import {postsType} from "../../../types/posts.type";
import {useHttp} from "../../../hooks/useHttp";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAlert} from "../../../hooks/UseAlert";


type paramsType = {
    id: TopicsTypes
}

const TopicPage = () => {
    const {id}: paramsType = useParams()
    const [posts, setPosts] = useState<Array<postsType>>([])
    const {request, loading} = useHttp()
    const {isAuthenticated} = useTypedSelector(state => state.authentication)
    const Alert = useAlert()

    const onClickNewPost = () => {
        if (!isAuthenticated) {
            Alert?.fire({
                title: <p>Sign In to create new post!</p>
            })
        }
    }

    const fetchPosts = async () => {
        try {
            const response = await request(`/api/posts/filter/${id}`)

            return response.data
        } catch (e) {
            console.log("Error fetching topic posts...", e)
        }
    }

    useEffect(() => {
        fetchPosts().then((data: Array<postsType>) => {
            setPosts(data.reverse())
        })

        // eslint-disable-next-line
    }, [request])

    return (
        <>
            <Header/>
            <div className="topicPosts topicPosts-outer">
                <div className="topicPosts-inner container">
                    <div className="topicPosts__title">
                        {Topics[id]}
                    </div>
                    <ul className="topicPosts__posts">
                        {
                            loading ? <li className="topicPosts__posts-item">Loading...</li> :
                                posts.length === 0 ?
                                        <Link
                                            className="topicPosts__posts-item"
                                            to="/newPost"
                                            onClick={onClickNewPost}
                                        >
                                            New Post!
                                        </Link>:
                                posts.map(post =>
                                    <li
                                        key={`topicPost${post.date}`}
                                        className="topicPosts__posts-item"
                                    >
                                        <div className="topicPosts__posts-item-title">
                                            {post.postTitle}
                                        </div>
                                        <div className="topicPosts__posts-item-body">
                                            {post.postBody}
                                        </div>
                                    </li>
                                )
                        }
                    </ul>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default TopicPage;