import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import { Book } from './book';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: true })
    @Length(10, 80)
    name: string;

    @Column({
        length: 100
    })
    @Length(10, 100)
    @IsEmail()
    email: string;

    @OneToMany(type => Book, book => book.user)
    @JoinTable()
    books: Promise<Book[]>;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}
