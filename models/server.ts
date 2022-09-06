import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/user.route'
import database from '../database/connexion';


export class Server {
    
    private apiPaths = {
        user: '/api/users'   
    }

    constructor(
        private readonly app: Application = express(),
        private readonly port: string = process.env.PORT || '3000'
    ) {
        
        this.middlewares()
        this.routes();
    }

    async database() {
        try {
            await database.authenticate();
            console.log('Datanbase connected');
        } catch (error) {
            throw new Error(JSON.stringify(error))
        }
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.user, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listen port: ' + this.port);
        })
    }


}