import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {useHttp} from "../../hooks/useHttp";
import {postsType} from "../../types/posts.type";

type paramsType = {
    id: string
}

const PostPage: FC = () => {
    const {request, loading} = useHttp()
    const [post, setPost] = useState<postsType>()
    const {id}: paramsType = useParams()

    const fetchPost = async () => {
        try {
            const response = await request(`/api/posts/${id}`)

            return response.data
        } catch (e) {
            console.log("Error fetching post...", e)
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
        // eslint-disable-next-line
    }, [request])

    const debug = loading? null : console.log(post)

    return (
        <div>

        </div>
    );
};

export default PostPage;