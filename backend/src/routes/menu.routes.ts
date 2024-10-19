import { Router } from 'express'
import {
  addMenuItemController,
  deleteMenuItemController,
  getAllMenuController,
  getMenuByCategoryController,
  updateMenuItemController
} from '~/controllers/menu.controllers'
import { accessTokenValidator, isAdmin } from '~/middlewares/auth.middlewares'
import { addMenuItemValidator, handleRequest, updateMenuItemValidator } from '~/middlewares/menu.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

export const menuRouter = Router()

/**
 * @route   GET api/menu/
 * @desc    Get all menu items
 * @access  Private (Admin or Employee)
 * @headers {Authorization: Bearer <access_token>} - access token required
 * @response
 *  {
 *    message: string,
 *    result: {
 *      menuItems: MenuItemType[],  // List of menu items
 *      total: number               // Total count of menu items
 *    }
 *  }
 */
menuRouter.get('/', accessTokenValidator, wrapRequestHandler(getAllMenuController))

/**
 * @route   GET api/menu/category/:categoryId
 * @desc    Get menu items by category ID
 * @access  Private (Admin or Employee)
 * @headers {Authorization: Bearer <access_token>} - access token required
 * @params  {categoryId: string} - ID of the category
 * @response
 *  {
 *    message: string,
 *    result: MenuItemType[]       // List of menu items in the category
 *  }
 */
menuRouter.get('/category/:id', accessTokenValidator, wrapRequestHandler(getMenuByCategoryController))
/**
 * @route   POST api/menu/
 * @desc    Add a new menu item
 * @access  Private (Admin)
 * @headers {Authorization: Bearer <access_token>} - access token required
 * @body
 *  {
 *    name: string,              // Name of the menu item
 *    price: number,             // Selling price of the menu item
 *    description: string,       // Description of the menu item
 *    category_id: string,       // ID of the category to which the item belongs
 *    availability: boolean,     // Whether the item is available or not
 *    stock: number,             // Number of items in stock
 *    image?: string             // Optional: URL of the image of the menu item
 *  }
 * @response
 *  {
 *    message: string,
 *    result: MenuItemType       // Newly created menu item
 *  }
 */
menuRouter.post(
  '/',
  accessTokenValidator,
  isAdmin,
  handleRequest,
  addMenuItemValidator,
  wrapRequestHandler(addMenuItemController)
)

/**
 * @route   PUT api/menu/:id
 * @desc    Update a menu item by its ID
 * @access  Private (Admin)
 * @headers {Authorization: Bearer <access_token>} - access token required
 * @params  {id: string} - ID of the menu item to be updated
 * @body
 *  {
 *    name?: string,             // Optional: Name of the menu item
 *    price?: number,            // Optional: Updated selling price
 *    description?: string,      // Optional: Updated description
 *    category_id?: string,      // Optional: Updated category ID
 *    availability?: boolean,    // Optional: Availability status
 *    stock?: number,            // Optional: Updated stock count
 *    image?: string             // Optional: Updated image URL
 *  }
 * @response
 *  {
 *    message: string,
 *    result: MenuItemType       // Updated menu item
 *  }
 */
menuRouter.put(
  '/:id',
  accessTokenValidator,
  isAdmin,
  handleRequest,
  updateMenuItemValidator,
  wrapRequestHandler(updateMenuItemController)
)

/**
 * @route   DELETE api/menu/:id
 * @desc    Delete a menu item by its ID
 * @access  Private (Admin)
 * @headers {Authorization: Bearer <access_token>} - access token required
 * @params  {id: string} - ID of the menu item to be deleted
 * @response
 *  {
 *    message: string,
 *    result: MenuItemType       // Deleted menu item
 *  }
 */
menuRouter.delete('/:id', accessTokenValidator, isAdmin, wrapRequestHandler(deleteMenuItemController))
