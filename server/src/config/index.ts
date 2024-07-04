import dotenv from "dotenv"

dotenv.config()


const MONGO_URL:any = process.env.MONGO_URL_STRING
const PORT = process.env.PORT || 8000
const ROUNDS:number = Math.floor(Math.random() * 11)

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server:{
        port:PORT,
        rounds:ROUNDS
    }

}
