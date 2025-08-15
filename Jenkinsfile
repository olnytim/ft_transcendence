// pipeline {
//   agent any
//   options { timestamps(); ansiColor('xterm') }
//   environment {
//     COMPOSE_FILE = 'docker-compose-main.yaml'
//   }
//   stages {
//     stage('Checkout') {
//       steps { checkout scm }
//     }
//     stage('Prepare & Build (make ci)') {
//       steps {
//         sh '''
//           set -e
//           make ci         # gen + app up --profile app
//         '''
//       }
//     }
//     // тут можно воткнуть тесты/линтеры/сканы
//     // stage('Tests') { steps { sh 'pytest -q || true' } }
//
//   }
//   post {
//     always {
//       sh 'make ci-clean || true'   // аккуратно снести app-стенд
//       junit allowEmptyResults: true, testResults: 'reports/junit/**/*.xml'
//       archiveArtifacts allowEmptyArchive: true, artifacts: 'reports/**/*, artifacts/**/*'
//     }
//   }
// }

pipeline {
  agent any
  stages {
    stage('Docker access') {
      steps {
        sh '''
          whoami
          id
          ls -l /var/run/docker.sock
          docker version
          docker ps
        '''
      }
    }
  }
}