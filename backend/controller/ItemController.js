import items from "../itemData.js";

//getItems
const getItems = (req, res) =>{
    console.log("Fetching all items");
    res.status(200).json(items);
}

//get Item by id
const getItem = (req, res, next) => {
    const id = parseInt(req.params.id);
    const item = items.find( (object) => object.id == id);
    if(!item){
        const error = new Error(`item not found by get method`);
        error.status = 404;
        return next(error);
    }
    res.status(200).json(item);
}

//update Item
// const updateItem = (req, res, next) => {

//     const id = parseInt(req.params.id);
//     const itemIndex = items.findIndex(obj => obj.id === id);

//     if (itemIndex === -1) {
//         const error = new Error(`Item not found for update`);
//         error.status = 404;
//         return next(error);
//     }
//     items[itemIndex] = req.body;

//     res.status(200).json(items[itemIndex]);
// }


//delete Item by using id
const deleteItem = (req, res, next) => {

    const id = parseInt(req.params.id);
    //to delete
    //using splice which takes startIndex and deleteCount
    //returns deletedArray
    const startIndex = items.findIndex( (obj) => obj.id === id);
    if(startIndex === -1){
        const error = new Error(`item not found by get update`)
        error.status = 404;
        return next(error);
    }
   const deletedArray = items.splice(startIndex,1);
    res.status(201).json(deletedArray[0]);
};


 export {getItem, getItems, deleteItem };