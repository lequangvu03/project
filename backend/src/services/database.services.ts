import 'dotenv/config'
import { Collection, Db, MongoClient } from 'mongodb'
import { envConfig } from '~/constants/config'
import Category from '~/models/schemas/categorys.schema'
import MenuItem from '~/models/schemas/menuItems.schema'
import MenuItemVariant from '~/models/schemas/menuItemVariant.schema'
import Order from '~/models/schemas/orders.schema'
import Otp from '~/models/schemas/otps.chema'
import RefreshToken from '~/models/schemas/refreshtoken.schema'
import Table from '~/models/schemas/tables.schema'
import User from '~/models/schemas/user.schema'

const uri = `mongodb+srv://${envConfig.dbUsername}:${envConfig.dbPassword}@cluster-project1.7ubyq.mongodb.net/`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(envConfig.dbName)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }
  async indexUsers() {
    const exists = await this.users.indexExists(['email_1_password_1', 'email_1', 'username_1'])
    if (!exists) {
      this.users.createIndex({ email: 1, password: 1 })
      this.users.createIndex({ email: 1 }, { unique: true })
    }
  }
  async indexRefreshTokens() {
    const exists = await this.refreshTokens.indexExists(['exp_1', 'token_1'])

    if (!exists) {
      this.refreshTokens.createIndex({ token: 1 })
      this.refreshTokens.createIndex(
        { exp: 1 },
        {
          expireAfterSeconds: 0
        }
      )
    }
  }
  get users(): Collection<User> {
    return this.db.collection('users')
  }
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection('refresh_token')
  }
  get otps(): Collection<Otp> {
    return this.db.collection('otps')
  }
  get tables(): Collection<Table> {
    return this.db.collection('tables')
  }
  get menuItems(): Collection<MenuItem> {
    return this.db.collection('menu_items')
  }
  get categories(): Collection<Category> {
    return this.db.collection('categories')
  }
  get variants(): Collection<MenuItemVariant> {
    return this.db.collection('variants')
  }
  get orders(): Collection<Order> {
    return this.db.collection('orders')
  }
}

// Tạo object từ class DatabaseService
const databaseService = new DatabaseService()
export default databaseService
