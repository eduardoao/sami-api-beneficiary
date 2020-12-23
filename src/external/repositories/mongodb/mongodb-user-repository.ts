import { BeneficiaryRepository } from '../../../usecases/ports/beneficiary-repository'
import { BeneficiaryData } from '../../../entities/beneficiary/beneficiary-data'
import { MongoHelper } from './helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class MongodbUserRepository implements BeneficiaryRepository {
  async update (beneficiary: BeneficiaryData): Promise<void> {
    const userCollection = MongoHelper.getCollection('beneficiary')
    const exists = await this.findUserByEmail(beneficiary.email)
    if (!exists) {
      await userCollection.updateOne(exists, beneficiary)
    }
  }

  async delete (id: string) : Promise<void> {
    const userCollection = MongoHelper.getCollection('beneficiary')
    const objectId = new ObjectId(id)
    const beneficiary = userCollection.findOne({ _id: objectId });   
    if (!beneficiary) {
      await userCollection.deleteOne(beneficiary)
    }
  }  

  
  async findAllUsers (): Promise<BeneficiaryData[]> {
    return await MongoHelper.getCollection('beneficiary').find().toArray()
  }

  async findUserByEmail (email: string): Promise<BeneficiaryData> {
    const userCollection = MongoHelper.getCollection('beneficiary')
    const result = await userCollection.findOne({ email: email })
    return result
  }

  async add (user: BeneficiaryData): Promise<void> {
    const userCollection = MongoHelper.getCollection('beneficiary')
    const exists = await this.exists(user.email)
    if (!exists) {
      await userCollection.insertOne(user)
    }
  }

  async exists (email: string): Promise<boolean> {
    const result = await this.findUserByEmail(email)
    if (result != null) {
      if (result.email === email) {
        return true
      }
    }
    return false
  }
}
