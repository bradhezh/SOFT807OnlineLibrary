module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection('items').insertMany([{
      name: 'The C Programming Language',
    }, {
      name: 'Computer Organization and Design',
    }, {
      name: 'Structure and Interpretation of Computer Programs',
    }, {
      name: 'Understanding the Linux Kernel',
    }])
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection('items').deleteMany({
      name: {
        $in: [
          'The C Programming Language',
          'Computer Organization and Design',
          'Structure and Interpretation of Computer Programs',
          'Understanding the Linux Kernel',
        ],
      },
    })
  },
}
