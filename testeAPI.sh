##Link da API
NODE_API='localhost'
## escolha do ID a manipular
NOTE_ID='2'

echo "Criando Nota"
echo "---------------------------"
echo "---------------------------"
curl -X POST \
  http://${NODE_API}/notes \
  -H 'Accept: */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'accept-encoding: gzip, deflate' \
  -H 'cache-control: no-cache' \
  -d '{
  "DevOps Challenger": {}
}'
echo "--"
echo "--"
echo "Buscando notas Cadastradas"
echo "---------------------------"
echo "---------------------------"
curl -X GET \
  http://${NODE_API}/notes \
  -H 'Accept: */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'accept-encoding: gzip, deflate' \
  -H 'cache-control: no-cache'
echo "--"
echo "--"
echo "Deletando notas Cadastradas Pela Variavel NOTE_ID"
echo "---------------------------"
echo "---------------------------"
curl -X DELETE \
  http://${NODE_API}/notes/${NOTE_ID} \
  -H 'Accept: */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'accept-encoding: gzip, deflate' \
  -H 'cache-control: no-cache' \
  -H 'content-length: '
echo "---------------------------"
echo "---------------------------"
echo "******TESTE FINALIZADO*******"
echo "---------------------------"
