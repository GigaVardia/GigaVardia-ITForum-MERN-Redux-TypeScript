import React from 'react';

import Header from "./Areas/Header";
import LeftSideBar from "./Areas/LeftSideBar";
import Main from "./Areas/Main";
import RightSideBar from "./Areas/RightSideBar";
import Footer from "./Areas/Footer";

const MainPage: React.FC = () => {
    return (
        <div className="app">
            <Header/>
            <LeftSideBar/>
            <Main/>
            <RightSideBar/>
            <Footer/>
        </div>
    );
};

export default MainPage;