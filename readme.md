# mackrusing's RESTful API

[![version](https://img.shields.io/github/package-json/v/mackrusing/rest-api)](./package.json)
![total lines](https://img.shields.io/tokei/lines/github/mackrusing/rest-api)
[![license](https://img.shields.io/github/license/mackrusing/rest-api)](./license.md)
[![last commit](https://img.shields.io/github/last-commit/mackrusing/rest-api)](https://github.com/mackrusing/rest-api/commits)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

A RESTful API that interacts with mock user data stored in a json file. This project is my first attempt at creating an API with node and express.

- [mackrusing's RESTful API](#mackrusings-restful-api)
  - [Installation](#installation)
  - [Dependencies](#dependencies)
    - [Dev dependencies](#dev-dependencies)
  - [Usage](#usage)
  - [Issues](#issues)
  - [License and forking](#license-and-forking)
  - [References](#references)

## Installation

1. Clone this repository to your machine

```shell
git clone https://github.com/mackrusing/rest-api.git
```

2. Install all dependences using npm. To exclude dev dependencies use the `--production` flag (if you don't want to install prettier)

```shell
npm install
npm install --production
```

3. Run the start script to get the server up and running

```shell
npm start
```

## Dependencies

- Node.js (and npm)
- Express

### Dev dependencies

- Prettier

## Usage

For information on how to interact with the `/users` endpoint, refer to the [API docs](./docs/index.md).

## Issues

If you find any bugs, feel free to open an issue on this projects [issue page](https://github.com/mackrusing/rest-api/issues).

## License and forking

All the source code is licesnsed under the

## References

Help and inspiration for this project.

- [RESTful APIs in 100 Seconds - Fireship | YouTube](https://youtu.be/-MTSQjw5DrM)
