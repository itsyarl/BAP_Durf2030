import { client, q } from '../config/db';
import Comment from '../models/Comment'

class CommentService {
  // constructor() {
  //   this.subscriptionsByRef = {}
  //   this.handleSnapshot = this.handleSnapshot.bind(this)
  //   this.handleVersion = this.handleVersion.bind(this)
  //   this.handleHistoryRewrite = this.handleHistoryRewrite.bind(this)
  //   this.handleError = this.handleError.bind(this)
  // }

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

//   getDocumentsAndSubscribe = async (id) => {

//     // First we will get all the document references.
//     const page = await this.getDocuments(id)
//     this.openStreams(page.data)
//     // We will return the references to the UI so it knows what to update.
//     return page
//   }

//   getDocuments = async (id) => {
//     return await client.query(
//         q.Paginate(q.Match(q.Index("comment_by_project"), id))
//     )
//   }

  openStreams = async (documentReferences) => {
    console.log('data retrieved', documentReferences.length)
    documentReferences.forEach((ref) => {
        // Open the subscription and start it. We can keep the default fields
        // or specify them ourselves
        //    action:      the action that triggered the event
        //    document:    the document's new data
        //    prev:        the document's old data (optional)
        //    diff:        the diff between old and new data (optional)
        // Let's just add all of them for the sake of demonstration :)
        const documentStream = client.stream.document(ref,
            { fields: ["action", "document", "prev", "diff"] }
        )

        // We'll save some extra data along with the stream so let's place it in an object.
        const streamAndData = {
            stream: documentStream
        }
        // We can then define our callbacks, which will receive 'event' and 'data'
        // parameters, event contains information about the event such as the type of event
        // and the transaction timestamp and includes the data,
        // data only contains the data.
        documentStream
            .on('snapshot', (data, event) => {
                this.handleSnapshot(streamAndData, data, event)
                // this.guiHandleSnapshot(data)
            })
            .on('version', (data, event) => {
                this.handleVersion(streamAndData, data, event)
                // this.guiHandleVersion(data)
            })
            .on('history_rewrite', (data, event) => this.handleHistoryRewrite(data, event))
            .on('error', (data, event) => this.handleError(streamAndData, data, event))
        // and start the stream
        documentStream.start()
        this.subscriptionsByRef[ref] = streamAndData
        // we'll return it so we have a reference to the stream to close it later on.
    })
  }

getCommentByProjectId = async (id, onChange) => {
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
        onChange(commentObj);
      })
    });
  })
  .catch((error) => console.log('error', error.message))
}
}

export default CommentService;