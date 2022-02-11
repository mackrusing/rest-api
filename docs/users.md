[< back to all endpoints](./index.md)

# users

Create, read, update, and delete mock user data.

- [GET /users](#get-users)
- [POST /users](#post-users)
- [PUT /users](#put-users)
- [PATCH /users](#patch-users)
- [DELETE /users](#delete-users)

## GET /users

Retrieve all users (with no query) or a single user (using a query)

```shell
curl -X GET 'http://localhost:8080/users?id=1'
```

### Optional parameters

| query param | description             | example value |
| ----------- | ----------------------- | ------------- |
| `id`        | select user by id       | `1`           |
| `username`  | select user by username | `johndoe`     |

### Responses

All response bodies (if a response returns a body) are of the media type `application/json`

200 - successfully retrieved all users

```json
[
  {
    "id": "1",
    "username": "johndoe",
    "displayName": "JohnDoe"
  },
  {
    "id": "2",
    "username": "janedoe",
    "displayName": "JaneDoe"
  }
]
```

200 - successfully retrieved a single user

```json
{
  "id": "1",
  "username": "johndoe",
  "displayName": "JohnDoe"
}
```

404 - user not found

```json
{
  "message": "user not found"
}
```

418 - invalid query

```json
{
  "message": "invalid query"
}
```

500 - invalid user data

```json
{
  "message": "server error: invalid user data"
}
```

## POST /users

Add a new user object to the json file

```shell
curl -X POST 'http://localhost:8080/users' \
  -H 'Content-Type: application/json' \
  -d '{"id": "3","username":"jamesdoe","displayName":"JamesDoe"}'
```

### Request body

The request body must be a complete user object, with a unique id and username.

```json
{
  "id": "3",
  "username": "jamesdoe",
  "displayName": "JamesDoe"
}
```

### Responses

All response bodies (if a response returns a body) are of the media type `application/json`

204 - the user was created and added successfully

```
No Content
```

409 - the username or id already exists

```json
{
  "message": "this id and/or username already exists"
}
```

418 - the request body is invalid

```json
{
  "message": "invalid user object"
}
```

500 - invalid user data

```json
{
  "message": "server error: invalid user data"
}
```

## PUT /users

Add a new user or replace an existing user

```shell
curl -X PUT 'http://localhost:8080/users' \
  -H 'Content-Type: application/json' \
  -d '{"id": "3","username":"jamesdoe","displayName":"JamesDoe"}'
```

### Request body

The request body must be a complete user object, with a unique id and username.

```json
{
  "id": "3",
  "username": "jamesdoe",
  "displayName": "JamesDoe"
}
```

### Responses

204 - the user was added/replaced successfully

```
No Content
```

409 - this username already exists

```json
{
  "message": "this username already exists"
}
```

418 - the request body is invalid

```json
{
  "message": "invalid user object"
}
```

500 - invalid user data

```json
{
  "message": "server error: invalid user data"
}
```

## PATCH /users

Select an existing user with the query and update it with with the request body.

```shell
curl -X PATCH 'http://localhost:8080/users?id=3' \
  -H 'Content-Type: application/json' \
  -d '{"username":"jamesdoe","displayName":"JamesDoe"}'
```

### Required parameters

_Note: Only one parameter is required; using both will result in an error_

| query param | expected value | description           |
| ----------- | -------------- | --------------------- |
| `id`        | string         | find user by id       |
| `username`  | string         | find user by username |

### Request body

The request body can include or leave out any proprties of a valid user object.

Example with all values:

```json
{
  "id": "3",
  "username": "JamesDoe",
  "displayName": "JamesDoe"
}
```

Example with excluded values:

```json
{
  "username": "JamesDoe",
  "displayName": "JamesDoe"
}
```

### Responses

204 - the user was updated successfully

```
No Content
```

404 - user not found

```json
{
  "message": "user not found"
}
```

418 - invalid query

```json
{
  "message": "invalid query"
}
```

500 - invalid user data

```json
{
  "message": "server error: invalid user data"
}
```

## DELETE /users

Delete a user

```shell
curl -X DELETE 'http://localhost:8080/users?id=1'
```

### Required parameters

_Note: Only one parameter is required; using both will result in an error_

| query param | expected value | description           |
| ----------- | -------------- | --------------------- |
| `id`        | string         | find user by id       |
| `username`  | string         | find user by username |

### Responses

All response bodies (if a response returns a body) are of the media type `application/json`

204 - successfully deleted a single user

```
No Content
```

404 - user not found

```json
{
  "message": "user not found"
}
```

418 - invalid query

```json
{
  "message": "invalid query"
}
```

500 - invalid user data

```json
{
  "message": "server error: invalid user data"
}
```
