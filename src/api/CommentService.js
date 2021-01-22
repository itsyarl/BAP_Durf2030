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

//   openStreams = async (documentReferences) => {
//     console.log('data retrieved', documentReferences.length)
//     documentReferences.forEach((ref) => {
//         // Open the subscription and start it. We can keep the default fields
//         // or specify them ourselves
//         //    action:      the action that triggered the event
//         //    document:    the document's new data
//         //    prev:        the document's old data (optional)
//         //    diff:        the diff between old and new data (optional)
//         // Let's just add all of them for the sake of demonstration :)
//         const documentStream = client.stream.document(ref,
//             { fields: ["action", "document", "prev", "diff"] }
//         )

//         // We'll save some extra data along with the stream so let's place it in an object.
//         const streamAndData = {
//             stream: documentStream
//         }
//         // We can then define our callbacks, which will receive 'event' and 'data'
//         // parameters, event contains information about the event such as the type of event
//         // and the transaction timestamp and includes the data,
//         // data only contains the data.
//         documentStream
//             .on('snapshot', (data, event) => {
//                 this.handleSnapshot(streamAndData, data, event)
//                 // this.guiHandleSnapshot(data)
//             })
//             .on('version', (data, event) => {
//                 this.handleVersion(streamAndData, data, event)
//                 // this.guiHandleVersion(data)
//             })
//             .on('history_rewrite', (data, event) => this.handleHistoryRewrite(data, event))
//             .on('error', (data, event) => this.handleError(streamAndData, data, event))
//         // and start the stream
//         documentStream.start()
//         this.subscriptionsByRef[ref] = streamAndData
//         // we'll return it so we have a reference to the stream to close it later on.
//     })
//   }

//   handleSnapshot = async (streamAndData, data, event) => {
//     // We'll keep the snapshot as well. The snapshot is useful in case you plan to apply changs
//     // incrementally. Instead of retrieving the data and then opening a stream,
//     // we can use the snapshot to make sure we have not missed an update.
//     console.log(data)
//     streamAndData.snapshot = data
//   }

//   handleVersion = async (streamAndData, data, event) => {
//     // We'll keep the last timestamp of the document.
//     streamAndData.last = data.document.ts
// }

// handleHistoryRewrite = async (data, event) => {
//     // Fauna allows to rewrite history, if you occasionally do rewrite history (e.g. to fix historic data errors)
//     // then it's a good idea to subscribe on this event and restart the stream for that document
//     // since a history rewrite can potentially change how the document looks today.
//     console.log('history rewrite, restarting stream', data, event)
//     // Hint, try using the dashboard shell to change history of a document, to see the result.
//     //   Insert(
//     //     Ref(<a document reference>, Now(), 'create', { data: { name: "haha, history changed! "}}
//     //   )
//     this.restartDocumentStream(data.document.ref)
//     // toast.warn(' History changed, restarting stream ', { autoClose: 5000, });
//   }

//   handleError = async (streamAndData, data, event) => {
//     // In the case of an error, we're going to print the error and
//     //  restart the stream for that document.
//     console.log('error, restarting stream', data, event, streamAndData)
//     this.restartDocumentStream(streamAndData.snapshot.ref)
//   }

//   restartDocumentStream = async (ref) => {
//     // let's fetch the stream subscription
//     const streamAndData = this.subscriptionsByRef[ref]
//     // close it
//     streamAndData.stream.close();
//     // and restart it again, we will wait slightly
//     setTimeout(() => {
//         this.openStreams([ref])
//     }, 100)
//   }

//   closeStreams = async () => {
//   //   // If we change a page, we'll close all the streams to release the
//   //   // underlying connections that the stream uses.
//   //   Object.keys(this.subscriptionsByRef).forEach((ref) => {
//   //       const streamAndData = this.subscriptionsByRef[ref]
//   //       console.log('closing stream', streamAndData.stream)
//   //       streamAndData.stream.close();
//   //   })
//     this.subscriptionsByRef = {}
//   }

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