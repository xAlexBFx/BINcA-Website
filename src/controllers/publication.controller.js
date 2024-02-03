import Publication from '../models/publication.js';

export const createPublication = async(req, res) => {
    console.log(req.body)
    res.json({
        uploaded: true,
        ErrorStatus: false
    })
}
//     try{
//         const dataBody = req.body;
//         if(dataBody.src && dataBody.title && dataBody.description) {
//             const src = req.body.src;
//             console.log(req.body)
//             const title = req.body.title;
//             const description = req.body.description;
//             const date = new Date()
//             const orderId = Publication.length + 1
//             //Process the data before add the data to the database
//                 const newPublication = new Publication({
//                     "src": src, 
//                     "title" : title,
//                     "description" : description,
//                     "date" : date,
//                     "orderId" : orderId
//                     })
//                 console.log(newPublication)

//         } else {
//             res.json({
//                 "message": "There is a problem, there is a missed value",
//                 "ErrorStatus" : true
//             })
//         }
//     } catch (err) {
//         console.log(err)
//         res.json({
//             "message": "Internal server problem",
//             "ErrorStatus" : true
//         })
//     }
// }

export const loadPublicationChunk = async(req, res) => {
    try {
        const reqOrderId = parseInt(req.params.loadedPublications);   
        let chunk = {
            chunkList: [],
            nPublications: 0,
            status:false
        }
        for (let i = 0; i < 6; i++) {
            chunk.chunkList.push(await Publication.findOne({"orderId" : reqOrderId + i}))
            chunk.nPublications++
            chunk.status = true
        }
        res.json(chunk)
    } catch (err) {
        console.log(`There is a problem in the server: ${err}`)
    }
}

export const deletePublication = async(req, res) => {
    try{
        const oId = parseInt(req.params.oId);
        const publicationWanted = await Publication.findOneAndDelete({orderId: oId})
        if (publicationWanted) {
            res.status(200).json({
                message: `The Publication with id: ${oId} was deleted successfully`,
                data: publicationWanted
            })
        }else {
            throw new Error(`There is not a publication with id ${oId}`)
        }
    } catch (err) {
        res.status(404).json({
            message: `There is an error: ${err}`
        })
    }
}