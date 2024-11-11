import { models } from '../models/index.js';

export const getlevelData = async (req, res) => {
    console.log('aasddsasd')
    try {
        const items = await models.Exp.findAll({
            order:[['level', 'ASC']]
        });


        const rtnData = {
            w: [],
            n: [],
            p: [],
            t: []
        }

        items.forEach(item => {
            switch (item['job']) {
                case 'w':
                    rtnData.w.push(item)
                    break;
                case 'n':
                    rtnData.n.push(item)
                    break;
                case 'p':
                    rtnData.p.push(item)
                    break;
                case 't':
                    rtnData.t.push(item)
                    break;
            }
        })

        if (!items || items.length === 0) {
            return res.status(404).json({ message: '레벨데이터 조회 중 오류가 발생 했습니다.' });
        }

        console.log('rtn', rtnData);
        return res.status(200).json(rtnData);
    } catch (error) {
        console.error('타입 조회 오류:', error);
        return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};
