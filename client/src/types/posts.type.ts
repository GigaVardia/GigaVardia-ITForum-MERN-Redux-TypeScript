export type repliesType = {replyAuthor: string, replyAuthorId: string, reply: string, date: string}[]
export type postsType = {
    postAuthor: string,
    postTitle: string,
    postBody: string,
    date: string,
    postReplies: repliesType,
    id: string
}

