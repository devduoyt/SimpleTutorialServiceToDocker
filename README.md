
# Tutorial para subir aplicação no docker hub

## Objetivo
Este tutorial tem como objetivo ensinar como subir uma aplicação no docker hub de maneira fácil e prática.

## Pré requisitos
Antes de começar, primeiro deve-se ter uma conta no docker hub (https://hub.docker.com/).

Com a conta criada, vá em Repositories, e depois em Create a Repository no canto esquerdo. Dessa forma pode criar um repositório no docker hub, o que é obrigatório para poder subir uma imagem no docker.

Com a conta e o repositório criados, poderá subir o serviço no docker hub, mas para isso, precisará loggar na máquina com a conta do docker. Para fazer isso, use o comando:

```bash
  docker login
```

Ele irá mostrar uma url e gerar um código, acessando ela com a sua conta criada e inserindo o código, você logga o docker hub na sua máquina. E ai sim, está pronto para subir a imagem no docker hub.

#### Nota: O docker deve estar instalado em sua máquina. E caso você opte por não colocar o docker no grupo sudo, terá que utilizar sudo para todos os comandos com docker, incluindo o docker login.

## Buildando e Subindo a Imagem docker
Com seu serviço criado (pode ver o exemplo de um serviço simples aqui no próprio repositório), primeiro crie o Dockerfile. Aqui no repositório tem um exemplo do meu Dockerfile, porém ele é feito para meu serviço (que utilizei node.js). Se não sabe como criar um Dockerfile, dê uma olhada no guia do próprio site do docker, lá eles ensinam o básico.

Não esqueça também do .dockerignore, ele funciona como o .gitignore, porém para a sua imagem docker.

Agora com o Dockerfile criado, você poderá buildar e subir a imagem com:

```bash
  docker buildx create --use
  docker buildx build --platform {platforms} -t {seu_usuario_no_docker_hub}/{nome_do_serviço}:{tag} --push .
```

Onde:
- {platforms} = As plataformas que o seu serviço vai rodar, como por exemplo linux/amd64 e linux/arm64 (podendo ser mais de uma plataforma se usado o buildx create)
- {seu_usuario_no_docker_hub} = nome do seu usuário no docker hub
- {nome_do_serviço} = o nome do serviço que está subindo
- {tag} = a tag do serviço, geralmente a versão (usa-se latest para indicar a última versão estável do serviço)

A primeira linha (docker buildx create --use) serve para criar e usar uma nova instância de construtor, usa-se isso para fazer builds de multiplataforma (como meu caso que quis usar amd64 e arm64). 

Já a segunda linha serve para buildar e já dar push no repositório do docker (caso só queira buildar e dar push só depois, pode remover o argumento --push e depois usar "docker push {seu_usuario_no_docker_hub}/{nome_do_serviço}:{tag}").

No meu caso, eu fiquei com a sintaxe abaixo:
```bash
  docker buildx create --use
  docker buildx build --platform linux/amd64,linux/arm64 -t devadrien123/example-server-docker:latest --push .
```

Com isso, agora qualquer um pode utilizar a sua imagem criada (se usado nas plataformas que você criou a imagem), basta saber o nome e a versão. Um exemplo de uso é com o compose. Aqui no repositório você pode ver o exemplo do meu docker-compose.yml que roda este serviço de exemplo do repositório. Com o docker-compose.yml, basta utilizar o comando do docker compose que ele irá criar o container na máquina com as configurações passadas.

A sintaxe padrão para subir o docker-compose.yml é:

```bash
  docker compose up
```

Caso queira deixar o container rodando em segundo plano, basta usar o argumento "-d".

Para parar o container, utilize:

```bash
  docker compose stop
```

E para apagar o container, pode utilizar:

```bash
  docker compose down
```

O argumento -v é usado para apagar os volumes físicos criados pelo container além do próprio container.

E com isso você já pode fazer sua primeira subida no docker hub.
