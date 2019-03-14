import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinTable } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import { User } from './user';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 256)
    title: string;

    @Column('text')
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
