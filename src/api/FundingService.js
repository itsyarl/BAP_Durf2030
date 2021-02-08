import { client, q } from '../config/db';

class FundingService {

  giveFunding = async (participant, funding, projectId, aantal) => {
    const object = await client.query(
      q.Get(
        q.Match(q.Index('funding_by_project_and_name'), [ projectId, funding ])
      )
    );
    const ref = object.ref.id;

    //document updaten
    await client.query(
      q.Update(
        q.Ref(q.Collection('Funding'), ref),
        { data: { 
            users: q.Append(participant, object.data.users),
            aantal: aantal
        } },
      )
    )
    .catch((err) => console.error('Error: %s', err))
  }

  removeFunding = async (id) => {
    const object = await client.query(
      q.Get(
        q.Match(q.Index('funding_by_id'), id)
      )
    )

    const ref = object.ref.id;

    await client.query(
      q.Delete(q.Ref(q.Collection('Funding'), ref))
    )
    .catch((err) => console.error('Error: %s', err))
  }

  createFunding = async funding => {
    return await client.query(
      q.Create(
        q.Collection('Funding'),
        { data: { 
          id: funding.id,
          projectId: funding.projectId,
          users: funding.users,
          product: funding.product,
          aantal: funding.aantal
        } },
      )
    )
    .then((response) => {
      return response;
    })
    .catch((error) => console.log('error', error.message))
  }


}

export default FundingService;