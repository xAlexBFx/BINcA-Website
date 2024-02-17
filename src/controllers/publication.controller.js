import Publication from '../models/publication.js';

function getCleanDate() {
    let dateNow = new Date();

    let month = String(dateNow.getMonth() + 1).padStart(2, '0');
    let day = String(dateNow.getDate()).padStart(2, '0');
    let year = dateNow.getFullYear();

    return `${month}/${day}/${year}`;
}

export const createPublication = async(req, res) => {
    try{
        const dataBody = req.body;
        const allowedFileTypes = ['image/jpeg', 'image/png'];
        if(allowedFileTypes.includes(req.file.mimetype) && dataBody.title && dataBody.description) {
            const src = req.file;
            const title = dataBody.title;
            const description = dataBody.description;
            const date = getCleanDate();
            const orderId = await Publication.countDocuments() + 1;
            const newPublication = new Publication({
                "imageSrc" : src.buffer,
                "imageName" : src.originalname,
                "imageType" : src.mimetype,
                "title" : title,
                "description" : description,
                "date" : date,
                "orderId" : orderId
                })
                const savedPublication = await newPublication.save()
                if(savedPublication) {
                    res.json({
                        "message": "Publication uploaded successfully",
                    })
                }
        } else {
            res.json({
                "message": "There is a problem, there is a missed value",
                "ErrorStatus" : true
            })
        }
    } catch (err) {
        console.log(err)
        res.json({
            "message": "Internal server problem",
            "ErrorStatus" : true
        })
    }
}

export const loadPublicationChunk = async(req, res) => {
    try {
        const reqOrderId = parseInt(req.params.loadedPublications);   
        let chunk = {
            chunkList: [],
            nPublications: 0,
            status:false
        }
        let chunkLength = 10
        for (let i = 0; i < chunkLength; i++) {
            const publicationData = await Publication.findOne({"orderId" : reqOrderId + i})
            if(publicationData) {
                const publicationCopy = {
                    "date" : publicationData.date,
                    "title" : publicationData.title,
                    "description" : publicationData.description,
                    "orderId" : publicationData.orderId,
                    "imageSrc" : publicationData.imageSrc.toString("base64"),
                    "imageName" : publicationData.imageName,
                    "imageType" : publicationData.imageType,
                }
                chunk.chunkList.push(publicationCopy)
                chunk.nPublications++
                chunk.status = true
            } else {
                throw new Error("There are not more publications")
            }
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