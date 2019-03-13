import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import { User } from './user';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 256)
    title: string;

    @ManyToOne(type => User, user => user.books)
    user: User;
}
