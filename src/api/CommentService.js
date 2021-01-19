import { client, q } from '../config/db'

class CommentService {

  createComment = async comment => {
    return await client.query(
      q.Create(
        q.Collection('Comments'),
        { data: { 
          id: comment.id,
          projectId: comment.projectId,
          content: comment.content,
          userId: comment.userId,
          timestamp: comment.timestamp,
          idea: false,
        } },
      )
    )
    .then((response) => {
      return response;
    })
    .catch((error) => console.log('error', error.message))
  }

  getCommentByProjectId = async id => {
    return await client.query(
        q.Paginate(
          q.Match(
            q.Ref('indexes/comment_by_project'), id)),
    )
    .then((response) => {
      const productRefs = response.data
      const getAllProductDataQuery = productRefs.map((ref) => {
        return q.Get(ref)
      })
      // query the refs
      return client.query(getAllProductDataQuery).then((data) => data);
    })
    .catch((error) => console.log('error', error.message))
  }
}

export default CommentService;