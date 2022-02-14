# RESTful API

- <https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm>
- <https://www.youtube.com/watch?v=-MTSQjw5DrM&ab_channel=Fireship>
- <https://www.toptal.com/nodejs/secure-rest-api-in-nodejs>
- <https://www.restapitutorial.com/lessons/httpmethods.html>

## User object structure

```json
{
  "id": "1", // unique value
  "username": "mackrusing", // unique value
  "displayName": "MackRusing"
}
```

## Get requests to /users

`GET /users`
: request without query returns list of all users

```json
RES BODY
[
  {
    "id": 1,
    "username": "mackrusing",
    "displayName": "MackRusing"
  },
  {
    "id": 2,
    "username": "reeserusing",
    "displayName": "ReeseRusing",
  }
]
```

`GET /users?id=1`, `GET /users?username=mackrusing`
: request with an optional parameter returns a single user

> making a request with more than one parameter may return unexpected results.

```json
RES BODY
{
  "id": 1,
  "username": "mackrusing",
  "displayName": "MackRusing"
}
```

### Optional parameters

| query param | expected value | description             |
| ----------- | -------------- | ----------------------- |
| `id`        | number         | find user from id       |
| `username`  | string         | find user from username |

## Post requests to /users

`POST /users`
: adds a new valid user object to the database

```json
REQ BODY
{
  "id": 2,
  "username": "reeserusing",
  "displayName": "ReeseRusing"
}
```

## Put requests to /users

`PUT /users?id=1`, `PUT /users?username=mackrusing`
: create a new user, replacing an existing user if it has the same id

## Patch requests to /users

`PATCH /users?id=1`, `PATCH /users?username=mackrusing`
: update properties of an existing user

## Delete requests to /users

`DELETE /users?id=1`, `DELETE /users?username=mackrusing`
: delete an existing user using id or username query

### Optional parameters

| query param | expected value | description             |
| ----------- | -------------- | ----------------------- |
| `id`        | number         | find user from id       |
| `username`  | string         | find user from username |

---

## Video object structure

```json
{
  "id": "335921245",
  "stream_id": "1",
  "title": "",
  "description": "",
  "language": "en",
  "user_id": "141981764",
  "user_login": "twitchdev",
  "user_name": "TwitchDev",
  "created_at": "2018-11-14T21:30:18Z",
  "published_at": "2018-11-14T22:04:30Z",
  "duration": "3m21s",
  "muted_segments": null,
  "thumbnail_url": "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/twitchdev/335921245/ce0f3a7f-57a3-4152-bc06-0c6610189fb3/thumb/index-0000000000-%{width}x%{height}.jpg",
  "url": "https://www.twitch.tv/videos/335921245",
  "type": "upload",
  "view_count": 3071170,
  "viewable": "public"
}
```
