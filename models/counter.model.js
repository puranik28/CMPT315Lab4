import mongoose from "mongoose";
import Monster from "../models/monster.model.js"; 

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 1 }
});

const Counter = mongoose.model("Counter", CounterSchema);

export async function getNextIncrementalId() {
  try {
    const lastMonster = await Monster.findOne().sort({ id: -1 });
    let nextId;
    if (lastMonster) {
      nextId = lastMonster.id + 1;
    } else {
      nextId = 1;
    }
    await Counter.findOneAndUpdate(
      { _id: 'monsterId' }, 
      { $set: { sequence_value: nextId } },
      { upsert: true }
    );
    return nextId;
  } catch (e) {
    throw new Error(`Failed to generate incremental ID: ${e.message}`);
  }
}

export default Counter;
