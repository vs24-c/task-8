import OwnerService from '../models/Owners/ownersServece.mjs';
import OwnerDetailService from "../models/DetailsOwner/ServiceDetails.mjs";
import {validationResult} from 'express-validator';

class OwnersController {
  static async getOwnersList(req, res) {
    try {
              const filter = {};
              for (const key in req.query) {
                if (req.query[key]) {
                  filter[key] = req.query[key];
                  filter[key]
                }
             }      
              if (Object.keys(filter).length > 0) {
                const resFilter = await OwnerService.getSearch(filter);
                return res.render('owners', {
                  owners: resFilter,
                });
              }

      const owners = await OwnerService.getList();
      return res.render('owners', {
        owners: owners,
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  static async getAddForm(req, res) {
    try {
      const id = req.params.id;        
      let owner = null;
      if (id) {
        owner = await OwnerService.getById(id);   
      }
      return res.render('addOwners', {
        errors: [],
        owner: owner,
      });
    } catch (error) {
      throw new Error('Error on server');
    }
  }

  static async addOwner(req, res) {
    try {
      const errors = validationResult(req);   
      const ownerObj = req.body;
      if (!errors.isEmpty()) {
        if (req.params.id) ownerObj.id = req.params.id;
        return res.render('addOwners', {
          errors: errors.array(),
          owner: ownerObj,
        });
      }

      const { name, surname, address, age, profession, descriptio } = ownerObj;

      if (req.params.id) {
        await OwnerService.updateOwner(req.params.id, { name, surname, address });  
        await OwnerDetailService.updateDetails(req.params.id, {age, profession, descriptio});
          } else {
           const details = await OwnerDetailService.createOwnerDetails({
             age,
             profession,
             descriptio,
           });             
            await OwnerService.createOwnerInfo({name, surname, address, details});
          }

      res.redirect('/owners');
    } catch (error) {
      res.render('addOwners', {
        errors: [{msg: error.message}],
        owner: req.body,
      });
    }
  }

  static async deleteOwner(req, res) {
    try {
      const id = req.params.id;
      await OwnerService.deleteOwnDyId(id);
      res.redirect('/');
    } catch (error) {
      throw new Error('Error DELETE');
    }
  }

  static async getClientShow(req, res) {
    try {
      const id = req.params.id;
      const owner = await OwnerService.getById(id)
      return res.render('client', {
        owner: owner,
      });
    } catch (error) {
      
    }
  }
}

export default OwnersController;