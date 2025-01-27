const menuModel = require('../db/model/menu');
const menuitemModel = require('../db/model/menuitem')
const { success_function, error_function } = require('../utils/responseHandler');


exports.addMenu = async function (req, res) {
    try {

        const { name, description } = req.body;
        if (!name || !description) {
            let response = error_function({
                message: "all fields are required"
            })
            res.status(response.statuscode).send(response);
            return;
        }
        const trimName = name.trim()
        const trimDescription = description.trim();
        if (!trimName || !trimDescription) {
            let response = error_function({
                message: "fields cannot be empty"
            })
            res.status(response.statuscode).send(response);
            return;
        }
        const check_menu = await menuModel.countDocuments(({
            name: { $regex: new RegExp("^" + trimName + "$", "i") }
        }))
        if (check_menu > 0) {
            let response = error_function({
                message: "menu already exists"
            })
            res.status(response.statuscode).send(response);
            return;

        } else {
            const menu = await menuModel.create({ name: trimName, description: trimDescription });
            if (menu) {
                let response = success_function({
                    message: "menu created successfully",
                    data: menu
                })
                res.status(response.statuscode).send(response);
                return;
            }
        }
    } catch (error) {
        console.log("error: ", error);
        let response = error_function({
            message: "internal server error"
        })
        res.status(response.statuscode).send(response);
        return;
    }
}

exports.addMenuItem = async function (req, res) {
    try {
        const { menuId, name, description, price } = req.body;
        console.log('body :',req.body)
        if (!menuId || !name || !description || !price) {
            let response = error_function({
                message: "All fields are required"
            })
            res.status(response.statuscode).send(response);
            return;
        }
        const trimName = name.trim()
        const trimDescription = description.trim()

        if (!trimName || !trimDescription) {
            let response = error_function({
                message: "Fields cannot be empty"
            });
            return res.status(response.statuscode).send(response);
        }

        if (isNaN(price) || price <= 0) {
            let response = error_function({
                message: "Price must be a positive number"
            });
            return res.status(response.statuscode).send(response);
        }

        const menuExists = await menuModel.findById(menuId);
        if (!menuExists) {
            let response = error_function({
                message: "Menu is not valid"
            });
            return res.status(response.statuscode).send(response);
        }
        const check_item = await menuitemModel.countDocuments(({ name: { $regex: new RegExp("^" + trimName + "$", "i") } }));

        if (check_item > 0) {
            let response = error_function({
                message: "this item already exists"
            })
            res.status(response.statuscode).send(response);
            return;
        } else {
            const addItem = await menuitemModel.create({ name: trimName, description: trimDescription, price, menuId })
            if (addItem) {
                let response = success_function({
                    message: "item added successfully",
                    data: addItem,
                })
                res.status(response.statuscode).send(response);
                return;
            }
        }


    } catch (error) {
        console.log("error: ", error);
        let response = error_function({
            message: "internal server error"
        })
        res.status(response.statuscode).send(response);
        return;
    }
}

exports.getMenuItems = async function (req, res) {
    try {
        const menu = req.query.menu;
        const page = req.query.page;
        const limit = req.query.limit;
        console.log("items : ", menu, page, limit)
        let filterArr = [];
        let skip;

        if (menu) {
            filterArr.push({ menuId: menu });
        }
        if (page && page > 0) {
            skip = (page - 1) * limit;
        }

        const getItems = await menuitemModel.find(filterArr.length > 0 ? { $and: filterArr } : {})
            .populate('menuId', 'name')
            .skip(skip)
            .limit(limit);

        const totalItems = await menuitemModel.countDocuments(filterArr.length > 0 ? { $and: filterArr } : {});
        const totalPages = Math.ceil(totalItems / limit);

        if (getItems) {
            const datas = {
                data: getItems,
                totalPages
            }
            let response = success_function({
                message: "items fetched successfully",
                data: datas,
            });
            res.status(response.statuscode).send(response);
            return;
        }

        let response = error_function({
            message: "error in fetching items"
        });
        res.status(response.statuscode).send(response);
        return;

    } catch (error) {
        console.log("error: ", error);
        let response = error_function({
            message: "internal server error"
        });
        res.status(response.statuscode).send(response);
        return;
    }
}


exports.getMenu = async function (req, res) {
    try {
        const getMenu = await menuModel.find();

        if (getMenu && getMenu.length > 0) {
            let response = success_function({
                message: "Menus fetched successfully",
                data: getMenu,
            });
            res.status(response.statuscode).send(response);
        } else {
            let response = success_function({
                message: "No menus available",
                data: [],
            });
            res.status(response.statuscode).send(response);
        }
    } catch (error) {
        console.log("Error fetching menus: ", error.message);
        let response = error_function({
            message: "Internal server error",
            error: error.message
        });
        res.status(response.statuscode).send(response);
    }
}
