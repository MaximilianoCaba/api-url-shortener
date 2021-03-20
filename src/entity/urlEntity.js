import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class UrlEntity {
  @PrimaryGeneratedColumn()
  id;

  @Column('varchar', { nullable: false })
  url;

  @Column('boolean', { default: true })
  enabled;
}
