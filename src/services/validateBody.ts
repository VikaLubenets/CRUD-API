import ValidateFields from './validateFields.js'

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

    return ValidateFields(obj);
}