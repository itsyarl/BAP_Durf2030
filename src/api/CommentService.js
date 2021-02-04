import { client, q } from '../config/db';
import Comment from '../models/Comment'

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
          timestamp: comment.timestamp
        } },
      )
    )
    .then((response) => {
      return response;
    })
    .catch((error) => console.log('error', error.message))
  }

  getCommentByProjectId = async (id, onChange, project) => {
    return await client.query(
        q.Paginate(
          q.Match(
            q.Ref('indexes/comment_by_project'), id)),
    )
    .then(async (response) => {
      const productRefs = response.data
      const getAllProductDataQuery = productRefs.map((ref) => {
        return q.Get(ref)
      })
      
      await client.query(getAllProductDataQuery).then((comments) => {
        comments.forEach(async comment => {
          //comments als model invoegen
          const commentObj = new Comment({
            id: comment.data.id,
            projectId: comment.data.projectId,
            content: comment.data.content,
            userId: comment.data.userId,
            from: comment.data.from,
            timestamp: comment.data.timestamp,
          });
          onChange(commentObj, project);
        })
      });
    })
    .catch((error) => console.log('error', error.message))
  }
}

export default CommentService;