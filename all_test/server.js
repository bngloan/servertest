const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = 
["https://www.yomabet.com","https://yomabet.com"];
// "https://react-fontend-5c241.web.app";
// "http://localhost:3000";
// app.use(cors(corsOptions));
app.use(cors({credentials: true, origin: corsOptions}));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));


//static image folder

app.use('/app/images',express.static('./app/images'))
// app.use('/app/images/driving',express.static('./app/images/driving'))

const db = require("./app/models");
const Role = db.role;
const SetStatus = db.setstatus;
const User = db.user;
const Bank = db.bank;
const Loan = db.loan;
const Weburl = db.weburl;


db.sequelize.sync();

// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
//     initial2();
//     initial3();
//      initial4();
//   });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/admin.routes')(app);
require('./app/routes/people.routes')(app);
require('./app/routes/bank.routes')(app);
require('./app/routes/loan.routes')(app);
require('./app/routes/weburl.routes')(app);




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 3,
    name: "mod"
  });

  Role.create({
    id: 2,
    name: "admin"
  });
}

function initial2(){
  Loan.create({
    amountmin: 30000,
    amountmax: 5000000,
    interest:7.5,
    longtime:12
  });
  Loan.create({
    amountmin: 30000,
    amountmax: 5000000,
    interest:3.4,
    longtime:24
  });
  Loan.create({
    amountmin: 30000,
    amountmax: 5000000,
    interest:2.7,
    longtime:36
  });
  Loan.create({
    amountmin: 30000,
    amountmax: 5000000,
    interest:1.9,
    longtime:48
  });
  Loan.create({
    amountmin: 30000,
    amountmax: 5000000,
    interest:1.2,
    longtime:60
  });
 
}



function initial3() {
  
    Bank.create({
        bankname: "ธนาคารกสิกรไทย"
    });
  
    Bank.create({
        bankname: "ธนาคารกรุงเทพ"
    });
  
    Bank.create({
        bankname: "ธนาคารไทยพาณิชย์"
    });
    Bank.create({
        bankname: "ธนาคารกรุงไทย"
      });
      Bank.create({
        bankname: "ธนาคารกรุงศรี"
      });
    
      Bank.create({
        bankname: "ธนาคารทหารไทยธนชาต"
      });
    
      Bank.create({
        bankname: "ธนาคารแลนด์แอนด์เฮ้าส์"
      });
      Bank.create({
        bankname: "ธนาคารออมสิน"
      });
      Bank.create({
        bankname: "ธนาคารเกียรตินาคินภัทร"
      });
      Bank.create({
        bankname: "ธนาคารซิตี้แบงก์"
      });
      Bank.create({
        bankname: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร"
      });
      Bank.create({
        bankname: "ธนาคารยูโอบี"
      });
  }

  function initial4(){
    Weburl.create({
      name: "facebook",
      nameurl: "URL_FABEBOOK"
    });
    Weburl.create({
      name: "line",
      nameurl: "URL_Line"
    });
    Weburl.create({
      name: "website",
      nameurl: "https://yomabet.com/"
    });
    Weburl.create({
      name: "gmail",
      nameurl: "URL_Gmail"
    });
    Weburl.create({
      name: "headertxt",
      nameurl: "มีข้อผิดพลาดเกิดขึ้น"
    });
    Weburl.create({
      name: "contenttxt",
      nameurl: "โปรดติดต่อเจ้าหน้าที่เพื่อทำการตรวจสอบ"
    });
   
   
  }

