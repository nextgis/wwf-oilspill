# wwf-oilspill

Emergency situations with oil spills

## Install

```bash
npm i
npm run prod
# for development
npm start
```

## Docker

```bash
docker build -t registry.nextgis.com/wwf-oilspill:latest . && docker push registry.nextgis.com/wwf-oilspill:latest

docker run -it -p 8080:8080 --rm --name wwf-oilspill registry.nextgis.com/wwf-oilspill:latest

docker push registry.nextgis.com/wwf-oilspill:latest
```
