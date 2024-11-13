import Owner from './ShemDetailOwn.mjs';
import Owners from "../Owners/OwnerSchem.mjs";


class DetailsOwnerService {
  static async createOwnerDetails(data) {
    const owner = new Owner(data);
    await owner.save();
    return owner
  }

  static async updateDetails(id, data) {
    const owners = await Owners.findById(id).populate('details');    
    const ownID = owners.details._id
      const newDetails = await Owner.findByIdAndUpdate(ownID, data, {
        new: true,
        runValidators: true
      })
      return newDetails
  }
}

export default DetailsOwnerService;