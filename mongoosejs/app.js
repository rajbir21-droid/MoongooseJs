const mongoose = require("mongoose");
const validator= require("validator");
mongoose.connect("mongodb://localhost:27017/paradiselike",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});


mongoose.connection
    .once("open",()=>console.log("connected"))
    .on("error",error =>{
        console.log("your error",error);
    });

const playSchema= new mongoose.Schema({
    name: {
        type:String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
        minlength:[2,"minimum 2letters"],
        maxlength:30
    },
    type: String,
    dta: {
        type:Number,
         validate(value){
            if(value<0){
              throw new Error("data count should not be negative")
            }
        }
        // validate:{
        //     validator:function(value){
        //         return value.length<0
        //     },
        //     message:"videos count should not be negative"
        // }
    } ,
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }

    },
    active: Boolean,
    date:{
        type:Date,
        default:Date.now
    }
})

const Playlist = new mongoose.model("Playlist",playSchema);

const createDocument = async ()=>{
    try{
        const nodePlaylist = new Playlist({
            name:"Node JS",
            type:"BackEnd",
            dta: 80,
            email:"raju.yo@go",
            active: true
        })
        const jsPlaylist = new Playlist({
            name:"javascript",
            type:"frontend",
            dta: 80,
            active: true
        })
        const expressPlaylist = new Playlist({
            name:"express JS",
            type:"BackEnd",
            dta: 80,
            active: true
        })
        const result = await Playlist.insertMany([nodePlaylist,jsPlaylist,expressPlaylist]);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}
createDocument();

const getDocument = async()=>{
   const result= await Playlist 
   .find( {type : "BackEnd" } )
   .select({name:1})
   .sort("name:1");
   console.log(result);
}
//getDocument();


const updateDocument = async(_id)=>{
    try{
    const result=await Playlist.findByIdAndUpdate({ _id},{
        $set : {
            name : "reactjs"
        }
    },{
        new: true,
        useFindAndModify:false
    });
    console.log(result);
}catch(err){
    console.log(err);
}
}


//updateDocument("607041e10a167f20a426d722");

const deleteDocument = async (_id) =>{
    try{
    const result= await Playlist.deleteOne({_id});
    console.log(result); 
    }catch(err){
        console.log(err);
    }
}

//deleteDocument("607041e10a167f20a426d722");