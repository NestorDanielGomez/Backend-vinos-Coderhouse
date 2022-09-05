// import express from 'express';
// import upload from '../middlewares/upload'
// import MongoDBClient from "../services/mongoDBClient"
// import Logger from '../services/logger';

// //IMAGES UPLOAD

// export default class ImagesRouter {

//     start() {
//         const router = express.Router();

//         router.get("/", (req,res) =>{
//             Logger.info('Reading Images DB')
//             res.status(200).json({
//                 msg: 'Image Roouter OK',
//             })
//         })

// 		router.post("/upload", upload.single("file"), async (req,res) => {

//            try {
//             if (req.file === undefined) return res.send("You must select a file.")
            
//             const imgUrl = `http://localhost:5000/api/file/${req.file.filename}`
//             const file = req.file

//             res.status(201).json({
//                 msg: 'Image saved',
//                 url: imgUrl,
//                 imgInfo: {
//                     file
//                 }
//             })

//            } catch (error) {
//             Logger.error('Error saving image')
//             res.status(400).json({
//                 msg: 'Error saving image',
//                 error: error
//             })
//            }
//           })
        
//         router.get("/:filename" , async (req,res) => {
//             try {
                  
//                 const readStream = await MongoDBClient.getFile(req.params.filename)
//                 readStream.pipe(res)

//             } catch (error) {
//                 Logger.error('Error getting image')
//                 res.status(404).json({
//                 msg: 'Error getting image',
//                 error: error
//             })
//             }
//         })

// 		return router;
// 	}
// }