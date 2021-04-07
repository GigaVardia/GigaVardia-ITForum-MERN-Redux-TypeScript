import React, {useEffect, useState} from 'react';
import {Link} from  "react-router-dom"
import {useHttp} from "../../../hooks/useHttp";
import {postsType} from "../../../types/posts.type";

const RightSideBar = () => {
    const [posts, setPosts] = useState<Array<postsType>>([])
    const {request, loading} = useHttp()

    const fetchPosts = async (num: number) => {
        try {
            const response = await request(`/api/posts/${num}`)

            return response.data
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    useEffect(() => {
        fetchPosts(5).then(data => {
            setPosts(data)
        })

        // eslint-disable-next-line
    }, [request])


    return (
        <aside className="r-aside r-aside-outer">
            <div className="r-aside-inner">
                <div className="r-aside__title">New Posts</div>
                <ul className="newPosts">
                    {
                        loading ? <li className="newPosts__item">Loading...</li> :
                            posts.map((item: postsType, index:number) =>
                                    <Link
                                        className="newPosts__item"
                                        key={index}
                                        to={`/post/${item.id}`}
                                    >
                                        {item?.postTitle}
                                    </Link>
                            )
                    }
                </ul>
            </div>
        </aside>
    );
};

export default RightSideBar;