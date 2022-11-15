import { Field, InputType } from 'type-graphql';

@InputType('DocumentInput')
export class DocumentInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  name: string;

  @Field()
  extension: string;
  
  @Field({ nullable: true })
  description?: string;
  
  @Field({ nullable: true })
  author?: string;
  
  @Field({ nullable: true })
  path?: string;
}
