# nownownow-json

https://agentcooper.github.io/nownownow-json/

Data from https://nownownow.com as a JSON file: [`./data.json`](./data.json).

You can view the JSON file as a table in the [Datasette UI](https://lite.datasette.io/?json=https%3A%2F%2Fraw.githubusercontent.com%2Fagentcooper%2Fnownownow-json%2Fmain%2Fdata.json#/data/data).

Or use [`jq`](https://jqlang.github.io/jq/) tool to query the data:

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
