import {Liquibase} from '../utils/liquibase';

export class LiquibaseServer {
    private environment: any;
    private params: any;

    constructor(
        environment: any
    ) {
        this.environment = environment;

        this.params = {
            liquibase: 'lib/liquibase-core-3.5.3.jar',
            driver: 'org.postgresql.Driver',
            classpath: 'lib/postgresql-9.4-1202.jdbc4.jar',
            defaultSchemaName: 'public',
            changeLogFile: 'resources/liquibase/db.changelog.xml',
            url: `jdbc:postgresql://${this.environment.db.host}:${this.environment.db.port}/${this.environment.db.database}`,
            username: this.environment.db.user,
            password: this.environment.db.password
        }
    }

    runPublic(): Promise<any> {
        const liquibase = new Liquibase(this.params);

        return new Promise( (resolve, reject) =>
            liquibase.run().then((data) => {
                console.log('✓ public schema updated!');
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        );
    }

    runLiquibase(): Promise<any> {
        return new Promise( (resolve, reject) =>
            this.runPublic().then(() => {
                resolve(null);
            }).catch((err) => {
                reject(err);
            })
        );
    }
}
