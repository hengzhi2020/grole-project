# GRole

Webapp created to manage access control of genisis resources.

# Dependencies

- sqlite 3
- python 3.7
  - flask
  - sqlalchemy
- nodejs 14.8.0

Example install:
```
# Import our GPG public key
rpm --import https://repo.anaconda.com/pkgs/misc/gpgkeys/anaconda.asc

# Add the Anaconda repository
cat <<EOF > /etc/yum/repos.d/conda.repo
[conda]
name=Conda
baseurl=https://repo.anaconda.com/pkgs/misc/rpmrepo/conda
enabled=1
gpgcheck=1
gpgkey=https://repo.anaconda.com/pkgs/misc/gpgkeys/anaconda.asc
EOF

yum install conda

yum install sqlite

conda create -n grole python=3.7
conda activate grole
conda install --file requirements.txt

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm install 14.8.0
npm install
```

# Development

`npm run dev` runs both react front end and flask back end

`npm run start` runs the react front end

`python src/backend/app.py` runs the flask backend

# Testing

`python src/backend/setup.py` adds some testing data to the db

`cd src/backend && ./runtest.sh`

TODO: convert curls to unittests `python -m unittest discover src/backend`

# Deployment

