# Algolia RESTful Web API

Add, update, update partial, delete and search records in any [Algolia](https://www.algolia.com/) base.

### Cloning

```
git clone https://github.com/theodorosidmar/algolia-web-api.git
```

### Initing

You first must set some environment variables. They are at `.env.sample`. Create a `.env` file and set them! Then, just run:

```
npm start
```
**or**
```
node .
```
*To know your `APPLICATION_ID` and `API_KEY`, visit your [Algolia dashboard](https://www.algolia.com/users/sign_in).
This means the application will consume only one Algolia (provided in these environment variables).*

## Routes

### Search indexes
This route will search the query and the indexes provided.
```
curl -X POST -H "Content-Type: application/json" -d '[ { "indexName": "yourIndexName", "query": "query" }, { "indexName": "anotherIndexName", "query": "anotherQuery" } ]' http://localhost:3000/api/v1/search
```

### Search all indexes
This route will search all indexes in Algolia. You can also send the same parameters as Algolia. See [here](https://www.algolia.com/doc/api-reference/api-parameters/).
```
curl -X POST -H "Content-Type: application/json" -d '{ "query": "query", "params": { "hitsPerPage": 3 } }' http://localhost:3000/api/v1/search-all
```

### Add
This route will add records in the index provided.
```
curl -X POST -H "Content-Type: application/json" -d '{ "indexName": "index", "objects": [ { "name": "example1", "foo": "bar"}, { "name": "example2", "foo": 1, "bar": 2 } ]}' http://localhost:3000/api/v1/add
```

### Update
This route will update your entire record. This means the record will be exactly what you send. `objectID` is required for each object you send. Otherwise, the record will not be updated.
```
curl -X PUT -H "Content-Type: application/json" -d '{ "indexName": "index", "objects": [ { "objectID": "objectIdInAlgolia", "name": "foobar" }, { "objectID": "objectIdInAlgolia", "foo": "bar" } ]}' http://localhost:3000/api/v1/update
```
In this case, both objects will now be exactly what was sent. The first one will have only `"name": "foobar"`, and the second one `"foo": "bar"`.

### Update partial
This route will update partial the record. This means the record will update only the fields you end. `objectID` is required for each object you send. Otherwise, the record will not be updated.
```
curl -X PUT -H "Content-Type: application/json" -d '{ "indexName": "index", "objects": [ { "objectID": "objectIdInAlgolia", "name": "newName" }, { "objectID": "objectIdInAlgolia", "age": 10 } ] }' http://localhost:3000/api/v1/update-partial
```
In this case, both objects will keep their existing fields. Only fields sent will be updated.

### Delete
This route will delete records in the index provided.
```
curl -X DELETE -H "Content-Type: application/json" -d '{ "indexName": "index", "objects": [ "algoliaObjectID", "anotherAlgoliaObjectID" ] }' http://localhost:3000/api/v1/delete
```

## Responses

Default response (OK):
```
{
  data: { 
    // Algolia return
    // Algolia objectIDs in most case
  },
  statusCode: 200
}
```

Error response (BAD_REQUEST):
```
{
  error: {
    message: // Error message
  },
  statusCode: 400
}
```

## TODO
* Tests
* Gracefully shutdown
* Readiness check (?)
* Requests caching layer
* Refactor [this](https://github.com/theodorosidmar/algolia-web-api/blob/master/src/config/express.js#L25)

## Extras

**Dockerfile** to create application image and **makefile** to help with Docker commands.
