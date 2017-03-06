const Sequelize=require("sequelize");
var sequelize=new Sequelize("njs","root","root",{
    host:"localhost",
    dialect:"mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
module.exports={
    user:sequelize.define("user",{
        id:{
            type:Sequelize.INTEGER(11),
            primaryKey:true
        },
        name:Sequelize.STRING(255),
        age:Sequelize.INTEGER(11)
    },{
        timestamps:false
    })
};