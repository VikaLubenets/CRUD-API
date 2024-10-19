export default function ValidateFields(obj){
    const template = {
        username: '',
        age: 0,
        hobbies: []
    }

    const tempKeys = Object.keys(template);

    for(let key of Object.keys(obj)){
        if(!tempKeys.includes(key)){
            return false
        }

        if(key === 'username' && typeof obj[key] !== 'string'){
            return false
        }

        if (key === 'age') {
            const age = parseInt(obj[key]);
            if (Number.isNaN(age) || !Number.isInteger(age) || age < 0) {
                return false;
            }
        }

        if(key === 'hobbies' && !Array.isArray(obj[key])){
            return false
        }
    }

    return true
}