import { dataRepo } from '../repo/dataRepo'
import { sortByDateDesc } from '../utils/format'
export const contentService = {
  async load() {
    const d = await dataRepo.getAll()
    return { ...d, blogs: sortByDateDesc(d.blogs) }
  },
}
