import { User } from '../types';
import ValidateFields from './validateFields'

export default function validateBody(obj: Partial<User>){
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