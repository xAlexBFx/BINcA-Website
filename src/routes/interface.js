import { Router } from "express"
import path from "path";
import { serverDirName } from "../server.js";
import * as publicationCtrl from '../controllers/publication.controller.js'
import multer from "multer"

const upload = multer({dest: "images"});
const router = Router();

router.get('/home', (req, res) => {
    res.sendFile(path.join(serverDirName, 'public', 'home', 'binca.html'))
})

router.get('/home/:loadedPublications', publicationCtrl.loadPublicationChunk);

router.get('/about-us', (req, res) => {
    res.sendFile(path.join(serverDirName, 'public', 'about-us', 'about-us.html'));
});

router.get('/for-families', (req, res) => {
    res.sendFile(path.join(serverDirName, 'public', 'for-families', 'for-families.html'));
});

router.get('/for-students', (req, res) => {
    res.sendFile(path.join(serverDirName, 'public', 'for-students', 'for-students.html'));
});

router.get('/binca-gallery', (req, res) => {
    res.sendFile(path.join(serverDirName, 'public', 'binca-gallery', 'binca-gallery.html'));
})

router.post('/binca-gallery',upload.single("image"), publicationCtrl.createPublication)

router.delete('/delete-publication/:oId', publicationCtrl.deletePublication)

export default router;