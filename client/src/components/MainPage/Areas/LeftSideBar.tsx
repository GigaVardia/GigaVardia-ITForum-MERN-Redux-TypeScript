import React from 'react';
import {Link} from "react-router-dom";
import {TopicsTypes as Topics} from "../../../types/topicsType";

const LeftSideBar = () => {
    return (
        <aside className="l-aside l-aside-outer" >
            <div className="l-aside-inner">
                <div className="l-aside__title">Topics</div>
                <ul className="l-aside-topics">
                    <li className="l-aside-topics__item">
                        <Link className="l-aside-topics__item-link" to={`/topics/${Topics.WEB_DEV}`}>
                            Web-Development
                        </Link>
                    </li>
                    <li className="l-aside-topics__item">
                        <Link className="l-aside-topics__item-link" to={`/topics/${Topics.GAME_DEV}`} >
                            Game Development
                        </Link>
                    </li>
                    <li className="l-aside-topics__item">
                        <Link className="l-aside-topics__item-link" to={`/topics/${Topics.DATA_ANALYSE}`}>
                            Data Analyse
                        </Link>
                    </li>
                    <li className="l-aside-topics__item">
                        <Link className="l-aside-topics__item-link" to={`/topics/${Topics.MOB_DEV}`}>
                            Mobile Development
                        </Link>
                    </li>
                    <li className="l-aside-topics__item">
                        <Link className="l-aside-topics__item-link" to={`/topics/${Topics.EMB_SYS_DEV}`}>
                            Embedded System development
                        </Link>
                    </li>
                    <li className="l-aside-topics__item">
                        <Link className="l-aside-topics__item-link" to={`/topics/${Topics.OTHERS}`}>
                            Others
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default LeftSideBar;