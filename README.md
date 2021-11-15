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
docker build -t registry.nextgis.com/wwf-oilspill:4.0.0 -f docker/Dockerfile . && docker push registry.nextgis.com/wwf-oilspill:4.0.0

docker run -it -p 8080:80 --rm --name wwf-oilspill registry.nextgis.com/wwf-oilspill:4.0.0

docker push registry.nextgis.com/wwf-oilspill:latest
```
