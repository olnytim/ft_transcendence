pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Test Backend') {
            steps {
                script {
                    echo "Building backend..."
                    sh 'docker compose -f docker-compose-main.yaml build back'
                    echo "Running backend tests..."
                    sh 'docker compose -f docker-compose-main.yaml run --rm back sh -c "coverage run manage.py test && coverage report"'
                }
            }
        }

        stage('Build and Test Frontend') {
            steps {
                script {
                    echo "Building frontend..."
                    sh 'docker compose -f docker-compose-main.yaml build front'
                    echo "Running frontend tests..."
                    sh 'docker compose -f docker-compose-main.yaml run --rm front npm test'
                }
            }
        }
    }
}

