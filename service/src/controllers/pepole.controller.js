const db = require("../models");

const integer_keys = ["places_count", "amount_per_place", "mens_rosh_ashana", "womens_rosh_ashana", "mens_kipur", "womens_kipur", "sum", "paid_up"];

module.exports.checkConnection = (req, res) => {
    res.status(200).json({ success: true });
}

module.exports.updateMap = async (req, res) => {
    try {
        let pepole_list_id = req.body.pepole_list_id;
        let map = req.body.map;
        let selected_gender = req.body.selected_gender;
        let selected_time = req.body.selected_time;

        const result = await db.Map.findOne({
            where: {
                pepole_list_id: pepole_list_id, selected_gender: selected_gender,
                selected_time: selected_time
            }
        })
        if (result) {
            db.Map.update({ map_data: map },
                {
                    where: {
                        pepole_list_id: pepole_list_id,
                        selected_gender, selected_gender,
                        selected_time: selected_time
                    }
                })
        }
        else {
            db.Map.create({
                pepole_list_id: pepole_list_id, selected_gender: selected_gender,
                selected_time: selected_time, map_data: map
            })
        }
        res.status(200).json({ success: true });
    }
    catch (ex) {
        console.log(ex);
        res.status(500).json({ success: false, error: ex });
    }
}

module.exports.getPepoleLists = async (req, res) => {
    try {
        const pepole_lists = await db.PepoleList.findAll();
        res.status(200).json({ success: true, pepole_lists: pepole_lists });
    }
    catch (ex) {
        console.log(ex);
        res.status(500).json({ success: false, error: ex });
    }
}

module.exports.getPepoleData = async (req, res) => {
    try {
        const pepole_data = await db.Pepole.findAll({
            where: {
                pepole_list_id: req.body.pepole_list_id
            }
        });
        res.status(200).json({ success: true, pepole_data: pepole_data });
    }
    catch (ex) {
        console.log(ex);
        res.status(500).json({ success: false, error: ex });
    }
}

module.exports.getMap = async (req, res) => {
    try {
        const data = await db.Map.findOne({ where: { pepole_list_id: req.body.pepole_list_id, selected_gender: req.body.selected_gender, selected_time: req.body.selected_time } })
        //console.log(data)
        res.status(200).json({ success: true, map: data ? data.map_data : null });
    }
    catch (ex) {
        console.log(ex);
        res.status(500).json({ success: false, error: ex });
    }
}

module.exports.getAllPepoles = async (req, res) => {
    try {
        let pepole_list_id = req.body.pepole_list_id;
        let pepole_lists = [];

        if (!pepole_list_id) {
            pepole_lists = await db.PepoleList.findAll();
            pepole_list_id = pepole_lists[pepole_lists.length - 1].id;
        }
        else {
            pepole_lists = await db.PepoleList.findAll({
                where: {
                    id: pepole_list_id
                }
            });
        }
        const data = await db.Pepole.findAll({
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
        const changesList = req.body.changesList;
        let data = [];
        for (let index = 0; index < changesList.length; index++) {
            let row = changesList[index];
            row = _initIntegerTypes(row);
            if (row.changed) {
                await db.Pepole.update(row, {
                    where: {
                        id: row.id
                    }
                });
            }
            if (row.added)
                await db.Pepole.create(row);
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
        const row = req.body.row;
        await db.Pepole.destroy({
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

        await db.PepoleList.create({ id: pepole_list.id, name: pepole_list.name, accountId: pepole_list.account_id });
        await db.Pepole.bulkCreate(pepole_list_data);

        const pepole_lists = await db.PepoleList.findAll();

        res.status(200).json({ success: true, pepole_lists: pepole_lists });
    }
    catch (ex) {
        res.status(500).json({ success: false, error: ex });
    }
}

module.exports.deleteList = async (req, res) => {
    try {
        const pepole_list_id = req.body.pepole_list_id;

        await db.Pepole.destroy({
            where: {
                pepole_list_id: pepole_list_id
            }
        });
        await db.PepoleList.destroy({
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

        db.PepoleList.update({ name: pepole_list_name },
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