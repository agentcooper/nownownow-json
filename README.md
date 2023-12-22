# nownownow-json

Data from https://nownownow.com as a JSON file: [`./data.json`](./data.json).

You can use [`jq`](https://jqlang.github.io/jq/) tool to query the data:

```bash
cat data.json | jq '.[] | select(.location | ascii_downcase | contains("amsterdam"))'
```

## Install dependencies

```bash
npm install
```

## Fetch HTML

```bash
# requires https://github.com/sibprogrammer/xq
./fetch
```

## Parse and update data.json

```bash
node parse.js > data.json
```