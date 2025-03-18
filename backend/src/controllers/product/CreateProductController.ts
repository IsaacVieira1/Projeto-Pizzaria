import { Request, Response } from 'express'
import { CreateProductService } from '../../services/product/CreateProductService' 
import { UploadedFile } from 'express-fileupload'

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

class CreateProductController {
    async handle(request: Request, response: Response) {
        const { name, price, description, category_id } = request.body

        const createProductService = new CreateProductService();

        if (!request.files || Object.keys(request.files).length === 0) {
            throw new Error("Error uploading file image");
        }

        const file: UploadedFile = request.files['file'];

        try {
            const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({}, (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                }).end(file.data);
            });

            console.log(resultFile);

            return response.json({});

            // const menu = await createProductService.execute({
            //     name,
            //     price,
            //     description,
            //     banner: banner,
            //     category_id
            // });

            // return response.json(menu);

        } catch (error) {
            return response.status(500).json({ error: "File upload failed" });
        }
    }
}

export { CreateProductController };
