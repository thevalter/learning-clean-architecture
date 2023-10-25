import { Express, Request, Response } from "express";
import UserService, { postValidation, putValidation } from "../../core/user/service/UserService";
import {validation} from "../../core/user/middleware/validation";

export default class UserController {
    constructor(
        readonly server: Express,
        readonly useCase: UserService
    ) {

        server.get('/users', async (req: Request, res: Response) => {
            const response = await useCase.get();

            return res.status(response.code).json(response);
        });

        server.get('/users/:email', async (req: Request, res: Response) => {

            const response = await useCase.getOne(req.params.email);

            return res.status(response.code).json(response);
        });

        server.post('/users', validation(postValidation), async (req: Request, res: Response) => {

            const { name, email, password } = req.body;
            const response = await useCase.post({ name, email, password });

            return res.status(response.code).json(response);
        });

        server.put('/users/:email', validation(putValidation), async (req: Request, res: Response) => {

            const { name, email, password } = req.body;

            const response = await useCase.put(req.params.email, { name, email, password });

            return res.status(response.code).json(response);
        });

        server.delete('/users/:email', async (req: Request, res: Response) => {

            const {email} = req.params;

            const response = await useCase.delete(email);

            return res.status(response.code).json(response);
        });
    }
}