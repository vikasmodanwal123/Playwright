
pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: [
                'test:e2e',
                'test:master',
                'test:sanity',
                'test:regression',
                'test:api',
                'test:web',
                'test:datadriven'
            ],
            description: 'Select the Playwright test suite'
        )

        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Select the browser'
        )

        choice(
            name: 'MODE',
            choices: ['headless', 'headed'],
            description: 'Select the browser execution mode'
        )
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Check Node.js and npm') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install chromium firefox webkit'
            }
        }

        stage('Create Environment File') {
            steps {
                bat 'if not exist .env copy .env.example .env'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    def tag = params.TEST_SUITE.replace('test:', '')
                    def modeFlag = params.MODE == 'headed' ? '--headed' : ''

                    withEnv(["CI=1"]) {
                        bat """
                            npx playwright test --grep "@${tag}" --project=${params.BROWSER} ${modeFlag} --reporter=dot --output=test-results
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'reports/**, custom-report/**, allure-results/**, test-results/**, playwright-report/**',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'Playwright CI pipeline completed successfully.'
        }

        failure {
            echo 'Playwright CI pipeline failed. Check Console Output and archived artifacts.'
        }

        cleanup {
            echo 'Pipeline execution finished.'
        }
    }
}