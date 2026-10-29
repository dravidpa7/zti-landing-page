// Data access layer. Swap the body of these functions for DB/API calls later; nothing else changes.
import data from '../../data.json'
export const dataRepo = {
  getAll: async () => data,
}
