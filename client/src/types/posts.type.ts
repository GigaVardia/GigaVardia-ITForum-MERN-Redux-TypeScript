export type postsType = {
    postTitle: string,
    postBody: string,
    date: string,
    postReplies: {replyAuthor: string, replyAuthorId: string, reply: string, date: string}[],
    id: string
}