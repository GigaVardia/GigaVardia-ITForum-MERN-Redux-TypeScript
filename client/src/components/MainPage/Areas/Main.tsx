import React from 'react';
import {Link} from  "react-router-dom"
import {postsType} from "../../../types/posts.type";

type MainSectionPropsType = {
    posts: postsType[],
    loading: boolean
}

const Main: React.FC<MainSectionPropsType> = ({posts, loading}) => {
    if (loading) {
        return (
            <main className="main main-outer">
                <div className="main-inner">
                    Loading...
                </div>
            </main>
        )
    }

    let sortedPopularPosts = [...posts];
    sortedPopularPosts.sort((a, b) => {
        if (a.postReplies.length > b.postReplies.length) {
            return -1
        } else if (a.postReplies.length < b.postReplies.length) {
            return 1
        } else {
            return 0
        }
    });

    return (
        <main className="main main-outer">
            <div className="main-inner">
                <h1
                    className="main__title"
                >
                    Most popular posts!
                </h1>
                <ul className="main__popularPosts">
                    {
                        posts.length > 0 ? posts.map((item, index) => {
                            return (
                                <Link
                                    key={`main${item.id}-${index}`}
                                    className="main__popularPosts-item"
                                    to={`/post/${item.id}`}
                                >
                                    &bull;{item.postTitle}
                                </Link>
                            )
                        }) : null
                    }
                </ul>
            </div>
        </main>
    );
};

export default Main;