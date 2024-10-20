import path from 'path';
import fsPromises from 'fs/promises';

export default async function handler(req, res)
{
    const dataFilePath = path.join(process.cwd(), '/public/questions.json');
    if(req.method === "POST"){
        try{
        const jsonData = await fsPromises.readFile(dataFilePath); 
        const objectData = JSON.parse(jsonData);
        const newQuestion = req.body; 
        const quizIndex = objectData.categories.findIndex(el => el.id  === newQuestion.quizId);
        console.log({quizIndex});   

        objectData.categories[quizIndex] = newQuestion.updatedQuiz;
        console.log({objectData});   
        await fsPromises.writeFile(dataFilePath, JSON.stringify(objectData));
        res.status(200).json({message: 'Data stored successfully'});}
        catch (error){
            console.log({error});
            res.status(500).json({message: 'Error storing data'});
        }
    }
    else if(req.method === "GET"){
        const jsonData = await fsPromises.readFile(dataFilePath);
        const objectData = JSON.parse(jsonData);

        res.status(200).json(objectData);
    }
}