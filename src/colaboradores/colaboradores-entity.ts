import { dependentesEntity } from 'src/dependentes/dependentes-entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('larissa_colaboradores')
export class colaboradoresEntity{

@PrimaryGeneratedColumn()
id: string;

@Column()
nome: string;

@Column()
email: string;

@Column()
usuario: string;

@Column()
cpf: string;

@Column()
dt_nascimento: Date;

@Column()
dt_admissao: Date;

@Column()
dt_afastamento: Date;

@Column({nullable: true})
ds_motivo_afast: string;

@OneToMany(() => dependentesEntity, (dependentesEntity) => dependentesEntity.id_colaborador,
          { cascade: true, eager: true })
dependentes: dependentesEntity[]

}