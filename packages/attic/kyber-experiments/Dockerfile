# Pull base image.
FROM ubuntu:latest

# Install.
RUN \
    sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list && \
    apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y build-essential && \
    apt-get install -y software-properties-common && \
    apt-get install -y byobu curl git htop man unzip vim wget && \
    apt-get install libssl-dev && \
    rm -rf /var/lib/apt/lists/*

# Set environment variables.
ENV HOME /root

# Define working directory.
WORKDIR /root

RUN git clone https://github.com/pq-crystals/kyber.git && \
    cd kyber/ref && make &&\
    cd ../avx2 && make

# Define default command.
CMD ["bash"]