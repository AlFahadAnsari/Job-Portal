import multer from "multer"

const storage = multer.memoryStorage()
export const SignleUplaod= multer({storage}).single("file")