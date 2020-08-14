const childProcess = require('child_process');

export class Liquibase {
    private params;

    constructor(params = {}) {
        const defaultParams = {
            liquibase: '../lib/liquibase-core-3.5.3.jar',
            driver: 'org.postgresql.Driver',
            classpath: '../lib/postgresql-9.4-1201.jdbc4.jar'
        };
        this.params = Object.assign({}, defaultParams, params);
    }

    get command() {
        let cmd = `java -jar ${this.params.liquibase} `;
        Object.keys(this.params).forEach(key => {
            if (key === 'liquibase') {
                return;
            }
            const value = this.params[key];
            cmd = `${cmd} --${key}=${value}`;
        });
        return cmd;
    }

    exec(command, options = {}) {
        let child;
        let promise = new Promise((resolve, reject) => {
            child = childProcess
                .exec(command, options, (error, stdout, stderr) => {
                    if (error) {
                        error.stderr = stderr;
                        return reject(error);
                    }
                    resolve({stdout: stdout});
                });
        });
        return promise;
    }

    run(action = 'update', params = '') {
        return this.exec(`${this.command} ${action} ${params}`);
    }
}

