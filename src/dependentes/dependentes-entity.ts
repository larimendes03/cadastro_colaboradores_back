import { colaboradoresEntity } from "src/colaboradores/colaboradores-entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('larissa_dependentes')
export class dependentesEntity{

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    cpf: string;

    @Column()
    data_nascimento: Date;

    @Column()
    parentesco: string;

    @ManyToOne(() => colaboradoresEntity, (colaboradoresEntity) => colaboradoresEntity.dependentes,
                {onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'id_colaborador' })
    @Column()
    id_colaborador: string;

}