FROM node:0.12

MAINTAINER senthil <senthilkumar.hce@gmail.com>

EXPOSE 8000

COPY . /data
WORKDIR /data
RUN npm install

EPIONE_DEVELOPMENT_DB_PROTOCOL='https' EPIONE_DEVELOPMENT_DB_HOST='neo-myra-bartell-mediumslateblue-566dc414d680b.do-stories.graphstory.com' EPIONE_DEVELOPMENT_DB_PORT='7473'    EPIONE_DEVELOPMENT_DB_USER='566dc46eeef29' EPIONE_DEVELOPMENT_DB_PASS='iHgy8QsTwzqj6xKDjtpZw1dbb6N0hYyq560IS3FP' EPIONE_DEVELOPMENT_NODE_HOST='127.0.0.1' EPIONE_DEVELOPMENT_NODE_PORT='8000'

CMD ["npm","start"]
