all: build start

build:
	docker build . -f ci/Dockerfile -t grole

start:
	docker stack deploy --prune -c ci/docker-compose.yml grole

stop:
	docker stack rm grole
	# Wait until everything is removed
	sleep 1; \
	until [ -z "$$(docker network ls --filter label=com.docker.stack.namespace=grole -q)" ]; do \
	  sleep 1; \
	done

restart: stop start

full-restart: stop build start

backup: stop
	sudo rm -rf backups/tmp/
	mkdir -p backups/tmp/
	docker run --rm \
	  -v grole-db:/src \
	  -v `pwd`/backups/tmp/:/dest \
	  busybox \
	  sh -c "cp -r /src/* /dest/"
	sudo tar -czf ./backups/grole-`date -u -Iminutes`.tgz -C backups/tmp/ .
	sudo rm -rf backups/tmp/
	docker stack deploy --prune -c ci/docker-compose.yml grole

# The first line checks if the restore directory is empty
restore: stop
	sudo rm -rf backups/tmp/
	mkdir -p backups/tmp/
	sudo tar -xzf ${BACKUP_FILE} -C ./backups/tmp/
	[ "$$(ls -A backups/tmp/)" ] && \
	docker run --rm \
	  -v `pwd`/backups/tmp/:/src \
	  -v grole-db:/dest \
	  busybox \
	  sh -c "rm -rf /dest/* && cp -r /src/* /dest/"
	sudo rm -rf backups/tmp/
	docker stack deploy --prune -c ci/docker-compose.yml grole

.PHONY: build

