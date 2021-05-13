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
import {API} from "../../../config";

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
            const response = await request(`${API}/api/posts/filter/${id}`)
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
        <div className="wrapper">
            <Header/>
            <div className="topicPosts topicPosts-outer">
                <div className="topicPosts-inner container">
                    <div className="topicPosts__title">
                        {Topics[id]}
                    </div>
                    <ul className="topicPosts__posts">
                        {
                            loading ? <li className="topicPosts__posts-item">Loading...</li> :
                                posts.length < 1 ?
                                        <Link
                                            className="topicPosts__posts-item"
                                            to="/newPost"
                                            onClick={onClickNewPost}
                                        >
                                            Add new Post!
                                        </Link> :
                                posts.map(post =>
                                    <React.Fragment key={`topicPost${post.date}`}>
                                        <li

                                            className="topicPosts__posts-item"
                                        >
                                             <Link
                                                 className="topicPosts__posts-item-title"
                                                 to={`/post/${post.id}`}
                                             >
                                                 {post.postAuthor}: <br/>{post.postTitle}
                                             </Link>
                                            <div className="topicPosts__posts-item-body">
                                                {post.postBody}
                                            </div>
                                        </li>
                                        <Link
                                        className="topicPosts__posts-item"
                                        to="/newPost"
                                        onClick={onClickNewPost}
                                        >
                                        Add new Post!
                                        </Link>
                                    </React.Fragment>
                                )
                        }
                    </ul>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default TopicPage;