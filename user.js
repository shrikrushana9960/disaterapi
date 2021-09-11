const router = require("express").Router();
const client=require("./databaseconfig");
const userMapper=require("./Usermodel");
const mail=require("./sendMail")
const sms=require("./sendMessage");
router.post("/save", async (req, res) => {
  try {
   const rw = await userMapper.findAll();
   let name=req.body.name;
   let email=req.body.email;
   let phone=req.body.phone;
   let place=req.body.place;
   
   await userMapper.insert({id:rw._rs.rowLength + 1,name:name,email:email,place:place,phone:phone})
    res.status(200).json({ message: "sucessful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something gone Wrong" + err });
  }
});

router.post("/alert", async (req, res) => {
  try {
   
   let place=req.body.place;
   let type=req.body.type;
   console.log(place)
    const query = "SELECT * FROM disateruser WHERE place=? ALLOW FILTERING";
     const data = await client.execute(query, [place]);
    let mailid;
    let content="you have future disaster"+type+" Please be safe"
    data.rows.map(item=>{
      sms.send(item.phone,content)
      mailid=mailid+item.email+",";
    })
    if(mailid)
    {
      mail.send(mailid,content,"Disaster Alert")
    }
    res.status(200).json({ message: data.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something gone Wrong" + err });
  }
});



module.exports=router;

