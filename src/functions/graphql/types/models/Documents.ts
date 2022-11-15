import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType('Documents')
@Table({ tableName: 'Documents' })
export class Documents extends Model<Documents> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  @Field(() => ID)
  public id!: string;

  @Field({ description: 'Documents name.' })
  @Column
  public name!: string;

  @Field({ description: 'Documents extension.' })
  @Column
  public extension!: string;

  @Field({ description: 'Description of the document.', nullable: true })
  @Column
  public description!: string;

  @Field({ description: 'Documents author.', nullable: true })
  @Column
  public author!: string;

  @Field({ description: 'Documents path.', nullable: true })
  @Column
  public path!: string;

  @Field({ description: 'Creation Date' })
  @CreatedAt
  public createdAt!: Date;

  @Field({ description: 'Updating Date' })
  @UpdatedAt
  public updatedAt!: Date;
}
