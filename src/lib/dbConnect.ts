import mongoose from "mongoose"


type ConnectionObject = {
    isConnected ?: number
}

const Connection : ConnectionObject= {} 

async function dbConnect() : Promise<void>{

    if(Connection.isConnected){
        console.log("Database Already Connected ")
        return
    }

    try {
       const db =  await mongoose.connect(process.env.MONGO_URI || "",{})
       Connection.isConnected = db.connections[0].readyState

       console.log(db,"this is whole db")
       console.log(db.connections , "this is db . connections here")

       console.log("Database Connected Successfully!")
        
    } catch (error) {
        console.log("Database Connection Failed!",error)
        process.exit(1)
        
    }

}

export default dbConnect;