# albergue oporto 
```
https://albergue-3a86a.web.app
```
## Prereqs
```
- NodeJS 14.20.0
```
## Commands
docker build -t barimale/albergue-oporto .

docker run -d -p 3000:3000 barimale/albergue-oporto

docker push barimale/albergue-oporto:latest

kubectl create namespace albergue-oporto

kubectl config set-context --current --namespace=albergue-oporto

kubectl apply -f deployment.yaml

kubectl apply -f load-balancer.yaml

