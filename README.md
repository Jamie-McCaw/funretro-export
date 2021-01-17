# FunRetro.io export

[![License][license-badge]][license-url]

> CLI tool to easily export [FunRetro.io](https://funretro.io/) retrospective boards using Playwright

## Installing / Getting started

It's required to have [npm](https://www.npmjs.com/get-npm) installed locally to follow the instructions.

```shell
git clone https://github.com/Jamie-McCaw/funretro-export
cd funretro-export
npm install
npm start -- -u "http://funretro.io/board..." -e "csv"
```

Went with the contraint of keeping the tool working the same way it originally worked with adding argument flags to allow for leaving off arguments if desired even when there are more than 2 arguments.

```shell
-u || -url        : Required and will error out if not provided, 
-f || -file       : Optional, will export to provided filename. Defaults to board title(Currently only works for 'txt')
-e || -exportType : Optional, defaults to 'txt'. Current choices are 'txt' and 'csv'.
```

## TODO

- Export card comments
- More export options (PDF, CSV)

## Licensing

MIT License

[license-badge]: https://img.shields.io/github/license/robertoachar/docker-express-mongodb.svg
[license-url]: https://opensource.org/licenses/MIT
