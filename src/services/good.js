import Good from '../models/Good.js'
import sortGoods from '../utils/sortGoods.js'

export const getAll = async (params) => {
  let goods;
  const sortParams = sortGoods(params.sort)
  const total = await Good.countDocuments({})
  
  if (params.page && params.perpage) {
    const startIndex = (params.page - 1) * params.perpage
    goods = await Good.find().collation({ locale: 'en', caseLevel: false }).sort(sortParams).limit(params.perpage).skip(startIndex)
  } else {
    goods = await Good.find().collation({ locale: 'en', caseLevel: false }).sort(sortParams)
  }

  return { goods, total }
}