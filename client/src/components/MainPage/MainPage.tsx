import React, {useEffect, useState} from 'react';

import Header from "./Areas/Header";
import LeftSideBar from "./Areas/LeftSideBar";
import Main from "./Areas/Main";
import RightSideBar from "./Areas/RightSideBar";
import Footer from "./Areas/Footer";
import {postsType} from "../../types/posts.type";
import {useHttp} from "../../hooks/useHttp";
import {API} from "../../config";

const MainPage: React.FC = () => {
    const [didMount, setDidMount] = useState(false)
    const [posts, setPosts] = useState<Array<postsType>>([]);
    const {request, loading} = useHttp();

    const fetchPosts = async (num: number) => {
        try {
            const response = await request(`${API}/api/posts/last/${num}`)

            return response.data
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    useEffect(() => {
        setDidMount(true)
        if (didMount) {
            fetchPosts(5).then(data => {
                setPosts(data)
            })
        }

        return () => setDidMount(false)
        // eslint-disable-next-line
    }, [didMount])

    return (
        <div className="app">
            <Header/>
            <LeftSideBar/>
            <Main posts={posts} loading={loading}/>
            <RightSideBar loading={loading} posts={posts}/>
            <Footer/>
        </div>
    );
};

export default MainPage;