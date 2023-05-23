import { IsString, Max, MaxLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Country {
  @Field()
  @PrimaryColumn({ unique: true, length: 2 })
  code: string;

  @Field()
  @Column({ length: 42 })
  name: string;

  @Field()
  @Column({ length: 1 })
  emoji: string;

  @Field()
  @Column({ length: 3 })
  continent: string;
}

@InputType()
export class CountryDto {
  @MaxLength(2)
  @Field()
  code: string;

  @MaxLength(42)
  @IsString()
  @Field()
  name: string;

  @MaxLength(1)
  @Field()
  emoji: string;

  @MaxLength(3)
  @Field()
  continent: string;
}
