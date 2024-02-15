import Monster from "../models/monster.model.js";
import { getNextIncrementalId } from "../models/counter.model.js";

//GET
export const getMonstersFromRepository = async (query) => {
  try {
    const monsters = await Monster.find(query);
    return monsters;
  } catch (e) {
    throw Error("Error while fetching monsters");
  }
}


//PATCH
export const updateMonstersInRepository = async (query, update) => {
  try {
    const monster = await Monster.findOneAndUpdate(
      { ...query },
      { ...update },
      { new: true }
    ).lean();
    return monster;
  } catch (e) {
    throw Error("Error while updating monster");
  } 
}

//DELETE
export const deleteMonsterFromRepository = async (query) => {
  try {
    const monster = await Monster.findOneAndDelete({ ...query });
    return monster;
  } catch (e) {
    throw Error("Error while deleting a monster");
  }
}


//POST
export const createMonstersInRepository = async (payload) => {
  try {
    const id = await getNextIncrementalId();
    payload.id = id;
    const newMonster = new Monster(payload);
    const savedMonster = await newMonster.save();
    return savedMonster;
  } catch (e) {
    throw new Error(`Error while creating a monster: ${e.message}`);
  }
}
