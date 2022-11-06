/**
 * Joins many classes depending on certains conditions.
 * @param conditions An object mapping the classes and their conditions.
 * @param extra An array of extra classes to add.
 * @returns the resulting string.
 */
 function conditionalClass(conditions: { [key: string]: boolean | undefined }, extra: Array<any> = []): string
 {
     let result = "";
     for(const className in conditions)
     {
         if(conditions[className]) result += ` ${className}`;
     }
     for(const extraClass of extra)
     {
        if(typeof extraClass === "string")
        {
            result += ` ${extraClass}`;
        }
     }
     return result;
 }
 
 export default conditionalClass;