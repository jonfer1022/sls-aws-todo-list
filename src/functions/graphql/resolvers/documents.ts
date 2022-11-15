import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { deleteFileS3, signedS3ToPut } from "../services/aws";
import { Documents } from "../types";
import { DocumentInput } from "../types/inputs";

@Resolver()
export class DocumentResolver {
  @Query(() => String)
  async getFileSignedtoPut(@Arg('name') name: string, @Arg('type') type: string) {
    try {
      return await signedS3ToPut(type, name);
    } catch (error) {
      console.log(`Error in getFileSignedtoPut: ${error}`);
      throw new Error(error);
    }
  }

  @Query(() => [Documents])
  async getAllDocuments() {
    try {
      return await Documents.findAll();
    } catch (error) {
      console.log(`Error in getAllDocuments: ${error}`);
      throw new Error(error);
    }
  }

  @Mutation(() => Boolean)
  async createDocument(
    @Arg("documentInput")
    { name, extension, author, description, path }: DocumentInput
  ) {
    try {
      await Documents.create({
        name,
        extension,
        author,
        description,
        path,
      });
      return true;
    } catch (error) {
      console.log(`Error in createDocument: ${error}`);
      throw new Error(error);
    }
  }

  @Mutation(() => Boolean)
  async removeDocument(@Arg("documentInput") { id, name, extension }: DocumentInput) {
    try {
      await deleteFileS3([{Key: `${name}.${extension}`}])
      await Documents.destroy({ where: { id } });
      return true;
    } catch (error) {
      console.log(`Error in removeDocument: ${error}`);
      throw new Error(error);
    }
  }

  @Mutation(() => Boolean)
  async editDocument(
    @Arg("documentInput")
    { id, name, extension, author, description }: DocumentInput
  ) {
    try {
      await Documents.update(
        {
          name,
          extension,
          author,
          description,
        },
        { where: { id } }
      );
      return true;
    } catch (error) {
      console.log(`Error in editDocument: ${error}`);
      throw new Error(error);
    }
  }
}
