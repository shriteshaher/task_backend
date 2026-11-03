pipeline {
    agent any

    triggers {
        githubPush()
        pollSCM('H/5 * * * *')
    }

    environment {
        DB_HOST = 'database-1.czgwemacg3tk.eu-north-1.rds.amazonaws.com'
        DB_NAME = 'my_app'
        DB_USER = 'postgres'
        DB_PORT = '5432'
        NODE_ENV = 'production'
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

        stage('Download RDS Certificate') {
            steps {
                sh '''
                    mkdir -p certs

                    wget -O certs/global-bundle.pem \
                    https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem

                    ls -lh certs/global-bundle.pem
                '''
            }
        }

        stage('Build Image') {
    steps {
        sh 'docker build -t taskmanagerbe:latest .'
    }
}

stage('Deploy') {
    steps {
        sh 'docker compose up -d --force-recreate app'
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
