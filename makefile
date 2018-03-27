build:
	docker build -t ${IMAGE_NAME} .

run:
	docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}

start:
	docker start ${CONTAINER_NAME}

stop:
	docker stop ${CONTAINER_NAME}