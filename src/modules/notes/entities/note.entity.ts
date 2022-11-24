import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('notes_id_uindex', ['id'], { unique: true })
@Entity('notes', {
  schema: 'public',
})
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    name: 'title',
    nullable: false,
  })
  title: string;

  @Column('text', {
    name: 'description',
    nullable: false,
  })
  description: string;

  @Column('text', {
    name: 'images',
    nullable: true,
    array: true,
    default: () => 'ARRAY[]::text[]',
  })
  images: string[];

  @Column({
    name: 'created_at',
  })
  @CreateDateColumn({
    type: 'timestamptz',
  })
  @Index()
  created_at: Date;

  @Column({
    name: 'updated_at',
  })
  @Index()
  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updated_at: Date;

  @Column({
    name: 'deleted_at',
  })
  @Index()
  @DeleteDateColumn({
    type: 'timestamptz',
  })
  deleted_at: Date;
}
