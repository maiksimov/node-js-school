import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pipelines')
export class Pipeline {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('json')
    steps: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}
