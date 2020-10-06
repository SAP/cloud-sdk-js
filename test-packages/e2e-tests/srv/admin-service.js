const cds = require('@sap/cds')

module.exports = async (srv) => {
  const db = await cds.connect.to('db');
  const { TestEntity } = db.entities

  srv.on("returnSapCloudSdk", async (oRequest) => {
    oRequest.reply("SapCloudSdk");
  });

  srv.on("createTestEntity", async (oRequest) => {
    const id = oRequest.data.id;
    await INSERT
      .into(TestEntity)
      .columns('KeyTestEntity')
      .values(id)
    oRequest.reply({KeyTestEntity: id});
  });

  srv.on("createTestEntityReturnId", async (oRequest) => {
    const id = oRequest.data.id;
    await INSERT
      .into(TestEntity)
      .columns('KeyTestEntity')
      .values(id)
    oRequest.reply(id);
  });
}
