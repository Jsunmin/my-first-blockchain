FROM ubuntu:latest

RUN apt-get update -y
RUN apt-get install -y software-properties-common

RUN apt-get install tzdata -y
ENV TZ=Asia/Seoul

RUN add-apt-repository ppa:ethereum/ethereum
RUN apt-get install vim -y
RUN apt update -y && apt install geth
RUN apt-get install git -y

WORKDIR  /root
RUN git clone https://github.com/ethereum/go-ethereum
RUN apt-get install -y build-essential golang

EXPOSE 8545
EXPOSE 8546

