import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1692064776438 implements MigrationInterface {
    name = 'Init1692064776438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_772886e2f1f47b9ceb04a06e20\` ON \`users\` (\`email\`, \`username\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_772886e2f1f47b9ceb04a06e20\` ON \`users\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\` (\`email\`)`);
    }

}
