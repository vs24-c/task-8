import Owners from "./OwnerSchem.mjs";
import Owner from "../DetailsOwner/ShemDetailOwn.mjs";
import mongoose from "mongoose";

class OwnerService {
  static async getList() {
    try {
      const exist = await Owners.checkExistDb;
      if (exist) {
        const data = await mongoose.model(collectionName).find().exec();
        return data;
      }
      return (await Owners.find({})) ?? [];
    } catch (error) {
      return [];
    }
  }

  static async getSearch(filter) {
    try {
      const data = await Owners.find(filter);
      return data;
    } catch (error) {
      return [];
    }
  }

  static async getById(id) {
    try {      
      const res = await Owners.findById(id).populate('details')
      return res
       
    } catch (error) {
      throw new Error('Error get user by id');
    }
  }

  static async createOwnerInfo(data) {
    const owners = new Owners(data);
    await owners.save();
  }



  static async updateOwner(id, data) {
    try {      
      await Owners.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
    } catch (error) {
      throw new Error('Error update owner');
    }
  }

static async deleteOwnDyId(id) {
  try {
    const owner = await Owners.findById(id).populate('details');
    if (owner.details) {
      await Owner.findByIdAndDelete(owner.details._id);
    }
    await Owners.findByIdAndDelete(id);
  } catch (error) {
    throw new Error('Error deleting owner');
  }
}

}

export default OwnerService;