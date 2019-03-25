import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinTable } from 'typeorm';
import { Length } from 'class-validator';
import { User } from './user';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    title: string;

    @Column('text', { nullable: true })
    description: string;

    @Column('int')
    userId: number;

    @ManyToOne(type => User, user => user.books)
    @JoinTable()
    user: User;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}
