import React from 'react';
import {repliesType} from "../../types/posts.type";

const MAX_REPLIES = 3;

type RepliesType = {
    replies: repliesType
}

const Replies: React.FC<RepliesType> = ({replies}) => {
    return (
        <>
            {
                replies.map((item, index) => {
                    return (
                        <div
                            className="replies-item"
                            key={`${item.replyAuthorId}-${index}`}>
                            <div className="replies-item-replyAuthor">
                                {item.replyAuthor}
                            </div>
                            <div className="replies-item-reply">
                                {item.reply}
                            </div>
                        </div>
                    )
                })
            }
        </>
    );
};

export default Replies;