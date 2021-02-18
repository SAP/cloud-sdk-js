// eslint-disable-next-line @typescript-eslint/no-var-requires
const cds = require('@sap/cds');

module.exports = async srv => {
  const db = await cds.connect.to('db');
  const { TestEntity } = db.entities;

  srv.on('getStringProperty', 'TestEntity', async oRequest => {
    const entity = await cds
      .transaction(oRequest)
      .run(SELECT.one.from(oRequest.query.SELECT.from));
    oRequest.reply(entity.StringProperty);
  });

  srv.on('returnSapCloudSdk', async oRequest => {
    oRequest.reply('SapCloudSdk');
  });

  srv.on('concatStrings', async oRequest => {
    oRequest.reply(Object.values(oRequest.data).join(''));
  });

  srv.on('returnInt', async oRequest => {
    const param = oRequest.data.param;
    oRequest.reply(param);
  });

  srv.on('returnCollection', async oRequest => {
    const param = oRequest.data.param;
    oRequest.reply([param]);
  });

  srv.on('getByKey', async oRequest => {
    const param = oRequest.data.param;
    const entity = await SELECT.one
      .from(TestEntity)
      .where({ KeyTestEntity: param });
    oRequest.reply(entity);
  });

  srv.on('getAll', async oRequest => {
    const entities = await SELECT.from(TestEntity);
    oRequest.reply(entities);
  });

  srv.on('returnKey', async oRequest => {
    // const query = oRequest._.req.query;
    // const p = query['@p'];
    // const key = p.KeyTestEntity;

    const param = oRequest.data.param;
    const key = param.KeyTestEntity;
    oRequest.reply(key);
  });

  srv.on('createTestEntity', async oRequest => {
    const id = oRequest.data.id;
    await INSERT.into(TestEntity).columns('KeyTestEntity').values(id);
    oRequest.reply({ KeyTestEntity: id });
  });

  srv.on('createTestEntityReturnId', async oRequest => {
    const id = oRequest.data.id;
    await INSERT.into(TestEntity).columns('KeyTestEntity').values(id);
    oRequest.reply(id);
  });
};
