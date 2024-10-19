export default function validateBody(obj){
    const template = {
        username: '',
        age: 0,
        hobbies: []
    }

    const tempKeys = Object.keys(template);
    const objKeys = Object.keys(obj)
    
    if(tempKeys.length !== objKeys.length){
        return false
    }

    for(let key of objKeys){
        if(!tempKeys.includes(key)){
            return false
        }

        if(key === 'username' && typeof obj[key] !== 'string'){
            return false
        }

        if(key === 'age' && typeof parseInt(obj[key]) !== 'number'){
            return false
        }

        if(key === 'hobbies' && !Array.isArray(obj[key])){
            return false
        }
    }

    return true
}