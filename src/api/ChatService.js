import { client, q } from '../config/db';
import Message from '../models/Message';
// import Message from '../models/Message';
import Project from '../models/Project'

class ChatService {

  getChatsByUser = async (id) => {
    return await client.query(
      q.Get(
        q.Match(q.Index('project_by_id'), id)
      )
    )
    .then((project) => {
      const projectObj = new Project({
        id: project.data.id,
        title: project.data.title,
        description: project.data.description,
        store: project.data.store,
        theme: project.data.theme,
        eventDate: project.data.eventDate,
        donationGoal: project.data.donationGoal,
        location: project.data.location,
        image: project.data.image,
        likes: project.data.likes,
        likedUsers: project.data.likedUsers,
        validated: project.data.validated,
        messages: project.data.messages
      });
      
      return projectObj;
    })
    .catch((error) => console.log('error', error.message))
  }

  createChatDocument = async chat => {
    return await client.query(
      q.Create(
        q.Collection('Messages'),
        { data: { 
          id: chat.id,
          projectId: chat.projectId,
          messages: []
        }}
      )
    )
    .then((response) => {
      return response;
    })
    .catch((error) => console.log('error', error.message))
  }

  sendMessage = async (content, id) => {
    const object = await client.query(
      q.Get(
        q.Match(q.Index('messages_by_project'), id)
      )
    );
    // referentie van document ophalen
    const ref = object.ref.id;
    //document updaten
    await client.query(
      q.Update(
        q.Ref(q.Collection('Messages'), ref),
        { data: { 
          messages: q.Append(content, object.data.messages)
         } },
      )
    )
    .catch((err) => console.error('Error: %s', err))
  }

  getMessagesById = async (projectId, onChange) => {
    // Before we get a new set of documents (e.g. the next page), we will close down existing streams
    this.closeStreams()
    // First we will get all the document references.
    const page = await this.getDocuments(projectId, onChange);
    this.openStreams(page.data, onChange);
  }

  getDocuments = async () => {
    return await client.query(
      q.Paginate(q.Documents(q.Collection("Messages")))
    );
  }

//   getDocuments = async (projectId, onChange) => {
//     return await client.query(
//         q.Paginate(q.Match(q.Index("messages_by_project"), projectId))
//     )
//     .then(async (response) => {
//       const productRefs = response.data
//       const getAllProductDataQuery = productRefs.map((ref) => {
//         return q.Get(ref)
//       })
      
//       return await client.query(getAllProductDataQuery).then((messages) => {
//         messages.forEach(async message => {
//           //message als model invoegen
//           const messageObj = new Message({
//             id: message.data.id,
//             projectId: message.data.projectId,
//             users: message.data.users,
//             messages: message.data.messages
//           });
//           onChange(messageObj);
//         })
//         return productRefs;
//       });
//     })
//     .catch((error) => console.log('error', error.message))
// }

  openStreams = async (documentReferences, onChange) => {
    console.log('data retrieved', documentReferences.length)
    documentReferences.forEach((ref) => {
      
        let stream = client.stream.document(ref)
          .on('snapshot', (data, event) => {
              // this.handleSnapshot(streamAndData, data, event);
              const messageObj = new Message({
                id: data.data.id,
                projectId: data.data.projectId,
                users: data.data.users,
                messages: data.data.messages
              });
              onChange(messageObj);
          })
          .on('version', (data, event) => {
            console.log(data);
            // this.handleSnapshot(streamAndData, data, event);
            const messageObj = new Message({
              id: data.document.data.id,
              projectId: data.document.data.projectId,
              users: data.document.data.users,
              messages: data.document.data.messages
            });
            console.log(messageObj);
            onChange(messageObj);
        })
            // .on('error', (data, event) => this.handleError(streamAndData, data, event))
        // and start the stream
        stream.start()
        // we'll return it so we have a reference to the stream to close it later on.
      })
    }
    

    handleSnapshot = async (streamAndData, data, event) => {
      // We'll keep the snapshot as well. The snapshot is useful in case you plan to apply changs
      // incrementally. Instead of retrieving the data and then opening a stream,
      // we can use the snapshot to make sure we have not missed an update.
      streamAndData.snapshot = data
    }

    handleError = async (streamAndData, data, event) => {
      // In the case of an error, we're going to print the error and
      //  restart the stream for that document.
      console.log('error, restarting stream', data, event, streamAndData)
      this.restartDocumentStream(streamAndData.snapshot.ref)
    }

    restartDocumentStream = async (ref) => {
      // let's fetch the stream subscription
      const streamAndData = this.subscriptionsByRef[ref]
      // close it
      streamAndData.stream.close();
      // and restart it again, we will wait slightly
      setTimeout(() => {
          this.openStreams([ref])
      }, 100)
    }

    closeStreams = async () => {
    //   // If we change a page, we'll close all the streams to release the
    //   // underlying connections that the stream uses.
    //   Object.keys(this.subscriptionsByRef).forEach((ref) => {
    //       const streamAndData = this.subscriptionsByRef[ref]
    //       console.log('closing stream', streamAndData.stream)
    //       streamAndData.stream.close();
    //   })
      this.subscriptionsByRef = {}
    }
}

export default ChatService;