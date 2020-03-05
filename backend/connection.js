const elasticsearch = require('elasticsearch')

const index = 'library'
const type = 'novel'
const port = 9200
const host = process.env.ES_HOST || 'localhost'
const client = new elasticsearch.Client({ host: { host, port } })

const checkConnection = async () => {
  let isConnected = false
  while (!isConnected) {
    console.log('Connecting to ES')
    try {
      const health = await client.cluster.health({});
      console.log(health);
      isConnected = true;
    } catch (err) {
      console.log('Connection Failed, Retrying...', err);
    }
  }
}

const resetIndex = async () => {
  if (await client.indices.exists({ index })) {
    await client.indices.delete({ index });
  }
  await client.indices.create({ index });
  await putBookMapping();
}

const putBookMapping = async () => {
  const schema = {
    title: { type: 'keyword' },
    author: { type: 'keyword' },
    location: { type: 'integer' },
    text: { type: 'text' },
  };
  return client.indices.putMapping({
    index,
    type,
    body: { properties: schema },
  });
}

module.exports = {
  client, index, type, checkConnection, resetIndex
}