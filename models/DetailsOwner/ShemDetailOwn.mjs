import mongoose from 'mongoose';
import config from '../../config/default.mjs';

// -----------------Schema save  data in DB----------//

const {Schema} = mongoose;

const ownerSchem = new Schema(
  {
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [12, 'Age must be at least 12'],
      max: [150, 'Age must be at most 150'],
    },

    profession: {
      type: String,
      required: [true, 'Surname is required'],
      minlength: [3, 'Surname must be at least 3 characters long'],
      maxlength: [15, 'Surname must be at most 15 characters long'],
      trim: true,
      escape: true,
    },
    descriptio: {
      type: String,
      required: [true, 'address is required'],
      minlength: [3, 'descriptio must be at least 3 characters long'],
      maxlength: [255, 'descriptio must be at most 255 characters long'],
      trim: true,
      escape: true,
    },
  },
  {collection: 'details'}
);


//-----------creat Model schema db----------------------//

ownerSchem.static.checkExistDb = async () => {
  const database = await mongoose.connection.listCollections();
  return database.database.some((db) => db.name === config.databaseName);
};

ownerSchem.static.checkExistCollection = async function () {
  if (!(await this.checkExistDb())) {
    console.log(`Database ${config.databaseName} does not exist`);
    return false;
  }
  const collections = await mongoose.connection.db.listCollections({ name: 'details' }).toArray();  
  if (collections.length === 0) {
    console.log(`Collection '${this.collections.name}' does not exist`);
    return false;
  } else {
    console.log(`Collection '${this.collections.name}' exists`);
    return true;
  }
};

const Owner = mongoose.model('Owner', ownerSchem);
export default Owner;
