# RESTful API

- <https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm>
- <https://www.youtube.com/watch?v=-MTSQjw5DrM&ab_channel=Fireship>
- <https://www.toptal.com/nodejs/secure-rest-api-in-nodejs>
- <https://www.restapitutorial.com/lessons/httpmethods.html#:~:text=The%20primary%20or%20most%2Dcommonly,but%20are%20utilized%20less%20frequently.>

## Api goals

| uri         | method | body        | result                  |
| ----------- | ------ | ----------- | ----------------------- |
| /users      | get    | empty       | list all users          |
| /users/:id  | get    | empty       | show deatils of user    |
| /addUser    | post   | json string | add details of new user |
| /deleteUser | delete | json string | delete existing user    |

## Get requests to /users

`GET /users`
: request without query returns list of all users

```json
RES BODY
[
  {
    "id": 1,
    "username": "mackrusing",
    "firstName": "Mack",
    "lastName": "Rusing"
  },
  {
    "id": 2,
    "username": "reeserusing",
    "firstName": "Reese",
    "lastName": "Rusing"
  }
]
```

`GET /users?id=1`, `GET /users?username=mackrusing`
: request with an optional parameter returns a single user

```json
RES BODY
{
  "id": 1,
  "username": "mackrusing",
  "firstName": "Mack",
  "lastName": "Rusing"
}
```

### Optional parameters

| query param | expected value | description             |
| ----------- | -------------- | ----------------------- |
| ?id         | number         | find user from id       |
| ?username   | string         | find user from username |

## Post requests to /users

`POST /users`
: adds a new valid user object to the database

```json
REQ BODY
{
  "id": 2,
  "username": "reeserusing",
  "firstName": "Reese",
  "lastName": "Rusing"
}
```

## Put requests to /users

## Patch requests to /users

`PATCH /users?id=1`, `PATCH /users?username=mackrusing`
: update properties of an existing user

## Delete requests to /users

`DELETE /users?id=1`, `DELETE /users?username=mackrusing`
: delete an existing user using id or username query


---

## Dependencies

- express
-
