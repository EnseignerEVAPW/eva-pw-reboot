import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnLastSeenToUser1715320100215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('user', new TableColumn({
            name: 'last_seen',
            type: 'timestamp',
            isNullable: true, // Opcional: permite que la columna admita valores nulos
            default: 'CURRENT_TIMESTAMP', // Opcional: establece la marca de tiempo actual como valor predeterminado
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user', 'last_seen');
    }

}
