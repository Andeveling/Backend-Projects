import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1691767450270 implements MigrationInterface {
    name = 'Init1691767450270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD \`access_level\` enum ('100', '60', '40') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP COLUMN \`access_level\``);
    }

}
