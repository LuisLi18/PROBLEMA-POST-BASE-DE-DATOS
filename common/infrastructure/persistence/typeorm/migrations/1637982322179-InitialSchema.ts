import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637982322179 implements MigrationInterface {
    name = 'InitialSchema1637982322179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`accounts\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`number\` varchar(15) NOT NULL, \`balance\` decimal(10,2) NULL, \`currency\` varchar(3) NULL, \`customer_id\` bigint UNSIGNED NOT NULL, \`created_at\` datetime NULL, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, UNIQUE INDEX \`UQ_accounts_number\` (\`number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` 
(\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, 
\`type\` enum ('O', 'S') NOT NULL DEFAULT 'S', 
\`created_at\` datetime NULL, 
\`created_by\` bigint NULL, 
\`updated_at\` datetime NULL, 
\`updated_by\` bigint NULL, 
\`description\` varchar(50) NULL, 
\`address\` varchar(75) NULL,  
\`discount\` varchar(20) NULL, 
\`quantity\` varchar(20) NULL,
\`first_name\` varchar(75) NULL, 
\`last_name\` varchar(75) NULL, 
\`dni\` varchar(8) NULL,
\`service\` varchar(20) NULL,
UNIQUE INDEX \`UQ_customers_dni\` (\`dni\`), 
PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transactions\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`type\` char(1) NOT NULL, \`status\` tinyint(2) UNSIGNED NOT NULL, \`account_id_from\` bigint UNSIGNED NOT NULL, \`account_id_to\` bigint UNSIGNED NULL, \`amount\` decimal(10,2) NULL, \`currency\` varchar(3) NULL, \`created_at\` datetime NULL, \`created_by\` bigint NULL, \`updated_at\` datetime NULL, \`updated_by\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`transactions\``);
        await queryRunner.query(`DROP INDEX \`UQ_customers_dni\` ON \`orders\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP INDEX \`UQ_accounts_number\` ON \`accounts\``);
        await queryRunner.query(`DROP TABLE \`accounts\``);
    }

}
