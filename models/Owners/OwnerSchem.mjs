import mongoose from "mongoose";
import config from "../../config/default.mjs";

// -----------------Schema save  data in DB----------//

const { Schema } = mongoose

const ownersSchem = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [15, 'Name must be at most 15 characters long'],
      trim: true,
      escape: true,
    },
    surname: {
      type: String,
      required: [true, 'Surname is required'],
      minlength: [3, 'Surname must be at least 3 characters long'],
      maxlength: [15, 'Surname must be at most 15 characters long'],
      trim: true,
      escape: true,
    },
    address: {
      type: String,
      required: [true, 'address is required'],
      minlength: [3, 'address must be at least 3 characters long'],
      maxlength: [100, 'address must be at most 100 characters long'],
      trim: true,
      escape: true,
    },
    details: {
      type: Schema.Types.ObjectId,
      ref: 'Owner',
    }
  },
  {collection: 'owners'}
);

//--------------------Creat Virtual---------------------//

ownersSchem.virtual('fullName').get(function () {
  return `${this.name} ${this.surname}`;
})

ownersSchem.set('toObject', {virtuals: true});
ownersSchem.set('toJSON', {virtuals: true});


//-----------creat Model schema db----------------------//

ownersSchem.static.checkExistDb = async () => {
  const database = await mongoose.connection.listCollections()
  return database.database.some((db) => db.name === config.databaseName)
}

ownersSchem.static.checkExistCollection = async function () {
  if (!(await this.checkExistDb())) {
    console.log(`Database ${config.databaseName} does not exist`);
    return false;
  }
  const collections = await mongoose.connection.db.listCollections({name: 'owners'}).toArray();
  if (collections.length === 0) {
    console.log(`Collection '${this.collections.name}' does not exist`);
    return false;
  } else {
    console.log(`Collection '${this.collections.name}' exists`);
    return true;
  }
};

const Owners = mongoose.model('Owners', ownersSchem);
export default Owners