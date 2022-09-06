import { Request, Response } from "express";
import User from "../models/user.model";

export const getUsers = async (req: Request, resp: Response) => {
    const users = await User.findAll()

    resp.json({users})
}

export const getUser = async (req: Request, resp: Response) => {
    
    const { id } = req.params;
    const user = await User.findByPk(id);

    if(!user) {
        resp.status(404).json({
            msg: 'User not found'
        })
    }

    resp.json(user);
}

export const postUser = async(req: Request, resp: Response) => {
    
    const { body } = req;

    try {
        const existEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if(existEmail) {
            return resp.status(400).json({
                msg: 'User already exist'
            });
        }

        const user = await User.create(body);
        user.save();
        resp.status(200).json(user);

    } catch (error) {
        console.log(error);
        resp.status(400).json({
            msg: 'Error with structure'
        })
    }
}

export const putUser = async(req: Request, resp: Response) => {
    
    const { id } = req.params
    const { body } = req

    try {

        const user = await User.findByPk(id);

        if(!user) {
            return resp.status(400).json({
                msg: 'User does not exist'
            });
        }

        await user.update(body)
        resp.json(user);

    } catch (error) {
        console.log(error);
        resp.status(400).json({
            msg: 'Error with structure'
        })
    }
}

export const deleteUser = async(req: Request, resp: Response) => {
    
    const { id } = req.params

    try {
        const user = await User.findByPk(id);

        if(!user) {
            return resp.status(400).json({
                msg: 'User does not exist'
            });
        }

        user.update({state: false});
        // user.destroy()
        resp.status(200).json(user)

    } catch (error) {
        console.log(error);
        resp.status(400).json('Internal server error')
    }


}