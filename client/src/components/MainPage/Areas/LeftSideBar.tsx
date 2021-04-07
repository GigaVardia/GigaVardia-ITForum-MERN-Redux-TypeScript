import React from 'react';

const LeftSideBar = () => {
    return (
        <aside className="l-aside l-aside-outer" >
            <div className="l-aside-inner">
                <ul className="l-aside-topics">
                    <li className="l-aside-topics__item">
                        <div className="topic-web">
                            HTML/CSS/JS
                        </div>
                    </li>
                    <li className="l-aside-topics__item">
                        <div className="topic-gameDev">
                            C++, C#, Java
                        </div>
                    </li>
                    <li className="l-aside-topics__item">
                        <div className="topic-languages">
                            BrainFuck
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default LeftSideBar;