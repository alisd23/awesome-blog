
export default (name, data, Model) => {

  const promises = [];
  for (let item of data) {
    promises.push(Model.create(item));
  }

  return Promise.all(promises)
    .then(() => {
      return Model.find().exec();
    })
    .then((dbObjects) => {
      console.log(`${dbObjects.length || '0'} ${name}s created`);
      if (dbObjects.length !== data.length) {
        throw new Error(`${name} seeder error`);
      }
    });

}
