pipeline {
    agent any

    triggers {
        githubPush()
        pollSCM('H/5 * * * *')
    }

    environment {
        DB_NAME = 'my_app'
        DB_USER = 'postgres'
        DB_PORT = '5432'
        NODE_ENV = 'development'
        NODE_PORT = '8080'
        APP_PORT = '8080'
        DB_PASSWORD = credentials('db-password')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Image') {
            steps {
                sh 'sudo docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'sudo docker compose up -d'
            }
        }

        stage('Verify') {
            steps {
                sh '''
                    for i in $(seq 1 12); do
                        if curl -fsS "http://localhost:${APP_PORT}/health" | grep -q '"db":"ok"'; then
                            echo "app healthy"
                            exit 0
                        fi
                        sleep 5
                    done
                    echo "app did not become healthy"
                    exit 1
                '''
            }
        }
    }

    post {
        failure {
            sh 'docker compose logs --tail=50 || true'
        }
        always {
            deleteDir()
        }
    }
}
