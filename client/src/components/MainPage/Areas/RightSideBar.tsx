import React from 'react';
import {Link} from  "react-router-dom"
import {postsType} from "../../../types/posts.type";

type RightSideBarPropsType = {
    posts: postsType[],
    loading: boolean
}

const RightSideBar: React.FC<RightSideBarPropsType> = ({posts, loading}) => {
    return (
        <aside className="r-aside r-aside-outer">
            <div className="r-aside-inner">
                <div className="r-aside__title">New Posts</div>
                <ul className="newPosts">
                    {
                        loading ? <li className="newPosts__item">Loading...</li> :
                            posts?.map((item: postsType, index:number) =>
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