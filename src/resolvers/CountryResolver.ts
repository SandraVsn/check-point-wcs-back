import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Country, CountryDto } from '../entities/Country';
import { dataSource } from '../db';

@Resolver(Country)
export class CountryResolver {
  /** ***********************************
     QUERY
     ************************************ */

  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    return await dataSource.getRepository(Country).find();
  }

  @Query(() => Country)
  async getOneCountry(
    @Arg('code', () => String) code: string
  ): Promise<Country> {
    const country = await dataSource
      .getRepository(Country)
      .findOne({ where: { code } });
    if (!country) throw new Error('This country does not exist');
    return country;
  }

  /** ***********************************
     MUTATION
     ************************************ */

  @Mutation(() => Country)
  async createCountry(@Arg('data') data: CountryDto): Promise<Country> {
    const countryAlreadyExists = await dataSource
      .getRepository(Country)
      .findOne({ where: { code: data.code } });
    if (countryAlreadyExists) throw new Error('This country Already Exists');
    return await dataSource.getRepository(Country).save(data);
  }
}
