##### Este projeto consiste na seguinte estrutura:

```
AppNode
├── app
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── chamadas.txt
├── docker-compose.yml
├── mysql
│   ├── db
│   │   └── database_schema.sql
│   └── Dockerfile
├── README.md
├── reverse
│   ├── Dockerfile
│   ├── nginx.conf
│   └── SSL
│       ├── cacert.pem
│       ├── servidor.crt
│       └── servidor.key
├── startProject.sh
└── testeAPI.sh

5 directories, 15 files

```

todo o ambiente foi projetado em Linux<br/>
porém como utilizaremos o Docker para deploy,<br/>
toda estrutura funcionará perfeitamente no windows/Linux/mac;<br/>
<br/>

**Aplicações necessárias:**<br/>
<br/>
Docker<br/>
Docker-compose<br/>
Openssl (para gerar o certificado proprietário)<br/>
Ansible (para chamada do ambiente na AWS)<br/>

**:::Sobre o projeto:::**<br/>
consiste em uma API, onde utiliza um banco de dados Mysql para armazenamento de dados,<br/>
e um proxy reverso para redirecionamento dos HTTP request.<br/>
<br/>

**O que foi feito para funcionamento do ambiente:**<br/>
primeiramente a verificação do código server.js<br/>
no mesmo foi verificado variáveis de ambiente para o NODE.js<br/>
observando que não havia a chamada do dotenv,
foi adicionado ao inicio do código para o funcionamento correto.<br/>

**Diretórios/arquivos:**<br/>
foi criado um diretório /app organizando os docs referente a aplicação/servidor NODE.js,<br/>
no diretório terá seu dockerfile, server.js e package.json contendo a instalação das dependências para funcionamento do node.js<br />
e dotenv a partir do npm, expondo a porta 8080 para funcionamento do servidor NODE.js.<br/>
<br/>
foi criado um diretório /mysql organizando os docs referente ao banco mysql<br/>
contendo uma subpasta /db onde está o banco da aplicação, seu dockerfile na raiz na mesma estrutura,<br/>
no momento do build realizando a copia do banco para o entripoynt.d do mysql,<br/>
para que todo o banco seja criado automaticamente deixando tudo mais prático.<br/>
<br/>
foi criado um diretorio /reverser organizando os docs referente ao proxy reverso<br/>
e uma subpasta /SSL nela contém os certificados para funcionamento do SSL<br/>
em o seu dockerfile os parametros fazendo o build e copiando os certificados,<br/>
junto também a copia do nginx.conf onde possui a config para o proxy reverso e funcionamento do SSL. <br/>

**Sobre o Docker-compose.yaml:**<br/>
nele terá todo código de deploy da aplicação,<br/>
em primeiro faço que o container MySQL inicie, preparando o banco junto de suas variáveis;<br/>
em segundo com uma dependecia do MySQL, ele somente inicia após o SQL está ok, container do servidor NODE.js<br/>
em terceiro o proxy reverso, utilizo um Nginx para tal, somente inicia após o container do servidor NODE.js está operante;</br>

**Iniciando tudo automaticamente em ambiente Linux:**<br/>
no terminal ao realizar o git clone do projeto,
navegue até /AppNode, onde está localizado o script de inicialização.<br/>
<br/>
ainda no terminal precisaremos dar permissão de execução ao shell-script de inicialização;<br/>

```
$ chmod +x ./startProject.sh

```
<br/>
após conceder permissão de execução apenas execute o script:<br/>

```
$ ./startProject.sh
```
será relizada toda verificação necessária, se já possui imagens ou buildś<br/>
após as verificação ira iniciar todo ambiente em docker, ao fim disponibilizando para uso.<br/>
<br/>

##### INICIANDO MANUALMENTE 
para inciar o Ambiente manualmente com ``` $ docker-compose up ``` em Linux/Windows/Mac:<br />
recomendado remover qualquer versão das seguintes imagens em seu docker:<br/>
```
ngix , mysql:5.7, node:10

-- Evitando qualquer conflito, para isso utilize:
$ docker image rm nginx:latest mysql:5.7 node:10
```
<br />
após a verificação e limpeza das imagens, iniciar todo o build e deploy com:

```
$ docker-compose up 

```
<br />

##### PROCESSO DE TESTE DA API 

**Teste automatizado:** 
Precisamos realizar o mesmo procedimento de permissão de execução para o testeAPI.sh
<br/>
dentro do diretorio raiz do projeto: /AppNode, realize o seguinte:

```
$ chmod +x ./testeAPI.sh
```

Após basta chamar o Shell-Script:
```
$ ./testeAPI.sh
```
<br />

**Referente ao SSL**
SSL adicionado, https funcionando para o projeto. <br/>
Projeto/API operando tanto na porta 80 quanto 443 <br/>

1) Para implementação do SSL foi gerado um certificado proprietário assinado pela CApŕopria, <br/>
utilizando o openssl com os seguintes comandos:
```
Gerar a chave privada com 4096 bits da CA:
$ openssl genrsa -des3 -out cacert.key 4096

Gerar o certificado auto-assinado da CA com validade de 10 anos:
$ openssl req -new -x509 -days 3650 -key cacert.key -out cacert.pem 

Criar a chave privada do servidor que será assinado pela CA:
$ openssl genrsa -out servidor.key 4096

Gerar a requisição de certificado do servidor que será assinado pela CA:
$ openssl req -new -key servidor.key -out servidor.csr

Assinar o certificado do servidor pela CA com validade de 10 anos:
$ openssl x509 -req -in servidor.csr -out servidor.crt -sha1 -CA cacert.pem -CAkey cacert.key -CAcreateserial -days 3650

```
Foi adicionado a seção SSL no arquivo de config do nginx.<br/><br/>

**Att: rodando o projeto em Stack para cluster SWARM**<br/>
Dentro do diretório principal basta chamar o seguinte:<br/>

```
docker swarm init ( iniciará o cluster swarm )
docker stack deploy -c docker-compose.yml DevOpsChallenge

para verificar o cluster:
docker stack ls <br/>
verificar os serviços:
docker service ls
caso queira escalar a quantidade de serviços para que o swarm realize o balancemento de carga:
docker service update "nome do serviço que deseja escalar" --replicas "quantidade" 
```

