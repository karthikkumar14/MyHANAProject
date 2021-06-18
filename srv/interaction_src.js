const cds = require("@sap/cds");
module.exports = (srv) => {
    const {
        Interactions_Header,
        Interactions_Items
    } = cds.entities('app.interactions');

    srv.on('READ', "Interactions_Header", async (req, res) => {
        const result = await cds.tx(req).run(SELECT.from(Interactions_Header, ['ID', 'PARTNER']))
        return req.reply(result);
    })

    srv.on('InsertHeader', async (req, res) => {
        var param = req.data.partner;

        const result = await cds.tx(req).run(SELECT.from(Interactions_Header))
        const size = Object.keys(result).length;
        const insertrec = await cds.tx(req).run(INSERT.into(Interactions_Header).entries({ ID: size + 1, PARTNER: param }))

        if (insertrec) {
            return req.reply("Successfully Inserted");
        }
        return req.reply("Failed to Insert");
    })
    srv.on('UpdateHeader', async (req, res) => {
        var param1 = req.data.id;
        var param2 = req.data.cc;
        var param3 = req.data.logdate;

        const result = await cds.tx(req).run(SELECT.from(Interactions_Header))
        const size = Object.keys(result).length;
        const updaterec = await cds.tx(req).run(
            UPDATE.entity(Interactions_Header).data({ LOG_DATE: param3, BPCOUNTRY_CODE: param2 }).where({ ID: param1 })
        )

        if (updaterec) {
            return req.reply("Successfully Updated");
        }
        return req.reply("Failed to Update");
    })
    srv.on('DeleteHeader', async (req, res) => {
        var param1 = req.data.id;

        const result = await cds.tx(req).run(SELECT.from(Interactions_Header).where({ID: param1}))
        const size = Object.keys(result).length;
        if(size > 0)
        {
        const deleterec = await cds.tx(req).run(
            DELETE.from(Interactions_Header).where({ ID: param1 })
        )
        if (deleterec) {
            return req.reply("Successfully Deleted");
        }
        return req.reply("Failed to Delete");
        }
        else
        {
          return req.reply("No Record Found");  
        }
    })

}