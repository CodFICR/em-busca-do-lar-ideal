const animalModel = require('../models').animal;
const racaModel = require('../models').raca;
const instituicaoModel = require('../models').instituicao;

const listAll = async (req,res)=>{

    const allAnimals = await animalModel.findAll({
        attributes:['foto','nome','porte','vacinacao','castracao','observacao'],
        include:[{model:racaModel,attributes:['description']}]
    });

    return res.status(200).json(allAnimals);
}

const store = async (req,res)=>{

    const {nome,peso,porte,vacinacao,castracao,observacao,foto,codigo_instituicao,codigo_raca} = req.body;

    await animalModel.create({
        nome,
        peso,
        porte,
        vacinacao,
        castracao,
        observacao,
        foto,
        codigo_instituicao,
        codigo_raca
    });
    
    return res.status(200).json({Message:'Tudo certo'});
}

const indexById = async (req,res)=>{
    const id = req.params.id;

    const animalExists = await animalModel.findOne({where:{codigo_animal:id}});
    
    if(!animalExists){
        return res.status(200).json({Error: "Animal não encontrado."});
    }

    const animal = await animalModel.findByPk(id,{ 
        attributes:['foto','nome','porte','vacinacao','castracao','observacao'],  
        include:[
            {model:racaModel,attributes:['description']},
            {model:instituicaoModel,attributes:['nome_instituicao']}
        ],
    });

    

    return res.status(200).json(animal);
}

const update = async (req,res)=>{

    const id = req.params.id;


    const animal = await animalModel.findByPk(id);
    
    if(!animal){
        return res.status(400).json({Message:"Animalzineo não encontrado."});
    }

    const animalzinho = await animal.update(req.body);

    return res.status(200).json(animalzinho);

}

const remove = async (req,res)=>{
    const id = req.params.id;
    
    await animalModel.destroy({where:{codigo_animal:id}});

    return res.status(200).json({error:"Animal deletado"});

}

module.exports = {listAll,store,indexById,remove,update};
