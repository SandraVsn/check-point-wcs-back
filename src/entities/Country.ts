import { Field, InputType, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Country {
  @Field()
  @PrimaryColumn({ unique: true })
  code: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  emoji: string;
}

@InputType()
export class CountryDto {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  emoji: string;
}
