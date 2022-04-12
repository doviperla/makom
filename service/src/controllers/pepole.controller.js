const integer_keys = ["places_count", "amount_per_place", "mens_rosh_ashana", "womens_rosh_ashana", "mens_kipur", "womens_kipur", "sum", "paid_up"];

module.exports.checkConnection = (req, res) => {
    res.status(200).json({ success: true });
}

// module.exports.getListsNames = async (req, res) => {
//     try {
//         const PepoleList = req.models.pepole_list;
//         const list_names = await PepoleList.findAll().select('name')
//         res.status(200).json({ success: true, list_names: list_names });
//     }
//     catch (ex) {
//         console.log(ex);
//         res.status(500).json({ success: false, error: ex });
//     }
// }

module.exports.updateMap = async (req, res) => {
    try {
        const PepoleList = req.models.pepole_list;
        const Pepole = req.models.pepole;

        let pepole_list_id = req.body.pepole_list_id;
        let map = req.body.map;
        let pepole = req.body.pepole;
        let turim = req.body.turim;

        PepoleList.update({ map: map, turim: turim },
            {
                where: {
                    id: pepole_list_id
                }
            });

        for (let index = 0; index < pepole.length; index++) {
            let row = pepole[index];
            row = _initIntegerTypes(row);
            if (row.changed) {
                await Pepole.update(row, {
                    where: {
                        id: row.id
                    }
                });
            }
        }

        res.status(200).json({ success: true });
    }
    catch (ex) {
        console.log(ex);
        res.status(500).json({ success: false, error: ex });
    }
}

module.exports.getAllPepoles = async (req, res) => {
    try {
        const Pepole = req.models.pepole;
        const PepoleList = req.models.pepole_list;

        let pepole_list_id = req.body.pepole_list_id;
        let pepole_lists = [];

        if (!pepole_list_id) {
            pepole_lists = await PepoleList.findAll();
            pepole_list_id = pepole_lists[pepole_lists.length - 1].id;
        }
        else {
            pepole_lists = await PepoleList.findAll({
                where: {
                    id: pepole_list_id
                }
            });
        }
        const data = await Pepole.findAll({
            where: {
                pepole_list_id: pepole_list_id
            }
        });

        res.status(200).json({ success: true, pepole: data, pepole_lists: pepole_lists });
    }
    catch (ex) {
        console.log(ex);
        res.status(500).json({ success: false, error: ex });
    }
}

module.exports.updateList = async (req, res) => {
    try {
        const Pepole = req.pepole;
        const changesList = req.body.changesList;
        let data = [];
        for (let index = 0; index < changesList.length; index++) {
            let row = changesList[index];
            row = _initIntegerTypes(row);
            if (row.changed) {
                await Pepole.update(row, {
                    where: {
                        id: row.id
                    }
                });
            }
            if (row.added)
                await Pepole.create(row);
        }
        res.status(200).json({ success: true });
    }
    catch (ex) {
        console.log(ex);
        res.status(500).json({ success: false, error: ex });
    }
}

_initIntegerTypes = (row) => {
    const rowKeys = Object.keys(row);

    rowKeys.forEach(prop => {
        if (integer_keys.includes(prop)) {
            if (row[prop] == "")
                row[prop] = 0;
            else
                row[prop] == parseInt(row[prop]);
        }
    });

    return row;
}

module.exports.deleteRow = async (req, res) => {
    try {
        const Pepole = req.pepole;
        const row = req.body.row;
        await Pepole.destroy({
            where: {
                id: row
            }
        });
        res.status(200).json({ success: true });;
    }
    catch (ex) {
        console.log(ex);
        res.status(500).json({ success: false, error: ex });
    }
}

module.exports.addNewList = async (req, res) => {
    try {
        const pepole_list = req.body.pepole_list;
        const pepole_list_data = req.body.pepole_list_data;

        const PepoleList = req.models.pepole_list;
        const Pepole = req.models.pepole;

        await PepoleList.create({ id: pepole_list.id, name: pepole_list.name, accountId: pepole_list.account_id });
        await Pepole.bulkCreate(pepole_list_data);

        res.status(200).json({ success: true });;
    }
    catch (ex) {
        res.status(500).json({ success: false, error: ex });
    }
}

module.exports.deleteList = async (req, res) => {
    try {
        const pepole_list_id = req.body.pepole_list_id;

        const PepoleList = req.models.pepole_list;
        const Pepole = req.models.pepole;

        await Pepole.destroy({
            where: {
                pepole_list_id: pepole_list_id
            }
        });
        await PepoleList.destroy({
            where: {
                id: pepole_list_id
            }
        });
        res.status(200).json({ success: true });;
    }
    catch (ex) {
        res.status(500).json({ success: false, error: ex });
    }
}

module.exports.changeNameList = async (req, res) => {
    try {
        const pepole_list_id = req.body.pepole_list_id;
        const pepole_list_name = req.body.pepole_list_name;

        const PepoleList = req.models.pepole_list;

        PepoleList.update({ name: pepole_list_name },
            {
                where: {
                    id: pepole_list_id
                }
            });

        res.status(200).json({ success: true });;
    }
    catch (ex) {
        res.status(500).json({ success: false, error: ex });
    }
}