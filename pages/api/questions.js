import questions from '../../public/questions.json';

export default async function handler(req, res)
{
    res.status(200).json(questions);
}