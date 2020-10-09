FROM nikolaik/python-nodejs:python3.7-nodejs14

RUN mkdir -p /app
WORKDIR /app

RUN wget http://aia.pki.va.gov/PKI/AIA/VA/VA-Internal-S2-RCA1-v1.cer && \
    openssl x509 -inform der -in VA-Internal-S2-RCA1-v1.cer -out va.crt && \
    cp va.crt /usr/local/share/ca-certificates/va.crt && \
    update-ca-certificates
ENV NODE_EXTRA_CA_CERTS /usr/local/share/ca-certificates/va.crt

COPY package.json package-lock.json .env.production ./
RUN npm install

COPY requirements.txt .
RUN pip install --cert va.crt -r requirements.txt

COPY . .

RUN npm run build

EXPOSE 4996

ENV PYTHONPATH /app/src/backend
CMD ["twistd", "--nodaemon", "web", "--wsgi", "app.app", "--port", "tcp:4996"]

