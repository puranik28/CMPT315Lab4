import { getMonstersFromRepository, updateMonstersInRepository, deleteMonsterFromRepository, createMonstersInRepository } from '../repositories/monster.repository.js';

export const getMonsters = async (req, res) => {
  try {
    const monsters = await getMonstersFromRepository({});
    res.status(200).send(monsters);
  } catch (e) {
    res.status(500).send(`Failed to fetch a list of monsters: ${e.message}`);
  }
}

export const getMonster = async (req, res) => {
  const { id } = req.params;
  try {
    const monster = await getMonstersFromRepository({ _id: id });
    res.status(200).send(monster);
  } catch (e) {
    res.status(500).send(`Failed to fetch monster ${id}: ${e.message}`);
  }
}

export const createMonster = async (req, res) => {
  const { body } = req;
  try {
    const monster = await createMonstersInRepository(body);
    console.log(monster);
    res.status(200).send(monster);
  } catch (e) {
    res.status(500).send(e.message, `failed to fetch monster ${id}`);
  }
}

export const updateMonster = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const monster = await updateMonstersInRepository({ _id: id }, body);
    res.status(200).send(monster);
  } catch (e) {
    res.status(500).send(`Failed to update monster ${id}: ${e.message}`);
  }
}

export const deleteMonster = async (req, res) => {
  const { id } = req.params;
  try {
    const monster = await deleteMonsterFromRepository({ _id: id });
    if (monster) {
      res.status(204).send();
    } else {
      res.status(404).send(`Failed to delete monster ${id}`);
    };
  } catch (e) {
    res.status(500).send(`Failed to delete monster ${id}: ${e.message}`);
  }
};
