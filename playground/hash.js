const bcrypt = require('bcrypt');

(async () => {
  let hp = await bcrypt.hash('mypassword', 10);
  let hp2 = await bcrypt.hash('mypassword', 10);

  console.log(hp);
  console.log(hp2);

  let res = await bcrypt.compare('mypassword', hp);
  console.log(res);

  let salt1 = await bcrypt.genSalt(10);
  let salt2 = await bcrypt.genSalt(10);
  console.log(salt1);
  console.log(salt2);

})();
