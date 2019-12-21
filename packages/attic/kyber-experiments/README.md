Build

```
docker build -t kyber-exp:latest .
docker run -it --rm kyber-exp:latest
```

Test

```
cd ./kyber/ref
./test_kyber512
```

Success looks like:

```
CRYPTO_SECRETKEYBYTES:  1632
CRYPTO_PUBLICKEYBYTES:  800
CRYPTO_CIPHERTEXTBYTES: 736
```
