import { MongoHelper } from '../external/repositories/mongodb/helpers/mongo-helper'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const PORT = 5000
MongoHelper.connect('mongodb+srv://sami:sami@cluster0.daskj.mongodb.net/sami?retryWrites=true&w=majority')
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(PORT || 5000, () => { console.log(`Server running at http://localhost:${PORT}`) })
  })
  .catch(console.error)
