// bcryptjs: It is used to hide the "password". It converts the password in # so that is will be unreadable for the "Admin" as well
// jsonwebtoken:it is stored in cookie-parser
// validator: it checks that the email written is in correct form or not
// nodemailer:it sends the mail automatically when the user clicks on "forgot email". We don't have to type the mail agin and again to send the user
//cookie-parser: jsonwebtoken is stored in cookie-parser. cookie makes the jsonwebtoken unaccessible for the front end

const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter user name"],
    maxLength: [30, "User name could not exceed to more then 30 characters"],
    minLength: [4, "User name should be more then 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    // validate will check that the email enter is in correct format or not
    validate: [validator.isEmail,"Please Enter a valid email"],
    unique: true, //email should not be repeated
  },
  password: {
    type: String,
    validator: false,
    minLength: [8, "Password should be more then 8 characters"],
    // select makes the visibility hidden for the admin, hence he will not be able to see the password of any user
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role:
  {
    type:String,
    default:"user"
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,
});
// pre save means before the userSchema is save bcrypt the password
// why we have used a function instead of a call back function?
// because we have to use this.password which can be written only inside function but not in a call back function
// what is the function of next here?
// 
userSchema.pre("save",async function(next)
{
  this
})
module.exports=mongoose.model("User",userSchema)