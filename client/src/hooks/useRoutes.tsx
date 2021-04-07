import {Route, Switch, Redirect} from "react-router-dom";
import MainPage from "../components/MainPage/MainPage";
import React from "react";
import NewPostPage from "../components/NewPost/NewPostPage";
import PostPage from "../components/PostPage/PostPage";

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
                <Switch>
                    <Route path="/user" exact>
                        <MainPage/>
                    </Route>
                    <Route path="/newPost" exact>
                        <NewPostPage/>
                    </Route>
                    <Route path="/post/:id" children={<PostPage/>}/>

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
                <Redirect to="/"/>
            </Switch>
    )
}