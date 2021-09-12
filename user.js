const router = require("express").Router();
const client=require("./databaseconfig");
const userMapper=require("./Usermodel");
const mail=require("./sendMail")

router.post("/save", async (req, res) => {
  try {
    console.log(req.body)
   const rw = await userMapper.findAll();
   if(!req.body.email)
  res.status(500).json({ message: "Something gone Wrong body is empty"  });
   let name=req.body.name;
   let email=req.body.email;
   let phone=req.body.phone;
   let place=req.body.place.toLowerCase();
   
   await userMapper.insert({id:rw._rs.rowLength + 1,name:name,email:email,place:place,phone:phone})
    res.status(200).json({ message: "sucessful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something gone Wrong" + err });
  }
});

router.post("/alert", async (req, res) => {
  try {
   if(!req.body.place)
  res.status(500).json({ message: "Something gone Wrong body is empty"  });
 
   let place=req.body.place.toLowerCase();
   let type=req.body.type;
   console.log(place)
   
    const query = "SELECT * FROM disateruser WHERE place=? ALLOW FILTERING";
     const data = await client.execute(query, [place]);
    let mailid;
    let content=" A potential natural disaster "+type+" has been detected in your area.  Please be safe"
    data.rows.map(item=>{
      

      mail.send(item.email,content,"Attention !")

   
    })
  
    res.status(200).json({ message: data.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something gone Wrong" + err });
  }
});



module.exports=router;

