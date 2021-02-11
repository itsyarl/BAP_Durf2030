import { client, q } from '../config/db';
import Message from '../models/Message';
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
    return await client.query(
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
    //bestaande stream sluiten
    this.closeStreams()
    // De documenten van de berichten ophalen
    const page = await this.getDocuments(projectId);
    this.openStreams(page.data, onChange);
  }

  getDocuments = async (projectId) => {
    return await client.query(
      q.Paginate((q.Match(q.Index("messages_by_project"), projectId)))
    );
  }

  openStreams = async (documentReferences, onChange) => {
    // console.log('data retrieved', documentReferences.length)
    documentReferences.forEach((ref) => {
      
        let stream = client.stream.document(ref)
          //op de start van de stream halen we alvast de bestaande berichten op
          .on('snapshot', (data, event) => {
              const messageObj = new Message({
                id: data.data.id,
                projectId: data.data.projectId,
                users: data.data.users,
                messages: data.data.messages
              });
              onChange(messageObj);
          })
          //op een verandering gaan we de messages ophalen en in de array steken
          .on('version', (data, event) => {
            console.log(data);
            const messageObj = new Message({
              id: data.document.data.id,
              projectId: data.document.data.projectId,
              users: data.document.data.users,
              messages: data.document.data.messages
            });
            console.log(messageObj);
            onChange(messageObj);
        })
        // de stream starten
        stream.start()
      })
    }
  

    closeStreams = async () => {
    //   Als we veranderen van pagina stoppen we de stream om geen continue check te krijgen.
      this.subscriptionsByRef = {}
    }
}

export default ChatService;