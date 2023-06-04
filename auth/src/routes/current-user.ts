import express from 'express';


const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req: express.Request, res: express.Response) => {
    
   res.send({ currentUser: req.currentUser || null });

});

export {router as currentUserRouter};