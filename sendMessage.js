const accountSid ="AC754861cd670c96a23ee2dd2a383e988d"
const authToken="3c341bf761afdf511e22180206171d0f";
const client = require('twilio')(accountSid, authToken);


const send = async(to, content) =>{
  try{
    await client.messages
  .create({
     body:content,
     from: '+1 480 719 6440',
     to: to
   })
  .then(message => console.log("message sended sucessfully"+message.sid));

  }
  catch(e){
    console.log(e)
  }
}

module.exports = { send }
