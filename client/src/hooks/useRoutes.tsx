import {Route, Switch, Redirect} from "react-router-dom";
import MainPage from "../components/MainPage/MainPage";
import React from "react";
import NewPostPage from "../components/NewPost/NewPostPage";
import PostPage from "../components/PostPage/PostPage";
import TopicPage from "../components/MainPage/TopicsPage/TopicPage";

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
                <Switch>
                    <Route path="/" exact>
                        <MainPage/>
                    </Route>
                    <Route path="/newPost" exact>
                        <NewPostPage/>
                    </Route>
                    <Route path="/post/:id" children={<PostPage/>}/>
                    <Route path="/topics/:id" children={<TopicPage/>}/>
                    <Route path="/" exact>
                        <Redirect from="/" to="/user"/>
                    </Route>
                </Switch>
        )
    }

    return (
            <Switch>
                <Route path='/' exact>
                    <MainPage/>
                </Route>
                <Route path="/topics/:id" children={<TopicPage/>}/>
                <Route path="/post/:id" children={<PostPage/>}/>
                <Redirect to="/"/>
            </Switch>
    )
}