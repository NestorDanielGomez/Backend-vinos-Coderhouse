import ApiCategories from "../api/categories";
import Logger from "../services/logger";

export default class CategoriesController{
    constructor() {
        this.ApiCategories = new ApiCategories();
    }
    getCategory = async ( req, res ) => {
        try {
            const { id } = req.params
            const category = await this.ApiCategories.getCategories(id)
            
            res.status(200).json({
                data: category
            })
        } catch (error) {
            Logger.error('API ERROR occurred when trying to read the Categories from the DB')
            res.status(400).json({
                msg: 'API ERROR occurred when trying to read the Categories from the DB',
                error: error
            })
            
        }
    }
    postCategory = async ( req, res) => {
        try {
            const newCategory = req.body
            const CategoryCreated= await this.ApiCategories.postCategory(newCategory)
            
            res.status(201).json({
                msg: 'Category created successfully',
                data: CategoryCreated
            })
        
        } catch (error) {
            Logger.error('API ERROR occurred when trying to create a catergory in the DB')
            res.status(400).json({
                msg: 'API ERROR occurred when trying to create a catergory in the DB',
                error: error
            })
        }
    }

    putCategory = async (req, res) => {
        try {
            const { id } = req.params;
            const newData = req.body;
            const updatedCategory = await this.ApiCategories.putCategory(id, newData);
    
        res.status(201).json({
                msg: 'Category updated successfully',
                data: updatedCategory,
            });
        } catch (error) {
            Logger.error('API ERROR occurred when trying to update a category in the DB');
            res.status(400).json({
                msg: 'API ERROR occurred when trying to update a category in the DB',
                error: error
            })
        }
    };
        
    deleteCategory = async (req, res) => {
        try {
            const { id } = req.params;
            await this.ApiCategories.deleteCategory(id);
        
            res.status(200).json({
                msg: 'Category deleted successfully',
            });
        } catch (error) {
            Logger.error('API ERROR occurred when trying to delete a category in the DB');
            res.status(400).json({
                msg: 'API ERROR occurred when trying to delete a category in the DB',
                error: error
            })
        }
    };
}