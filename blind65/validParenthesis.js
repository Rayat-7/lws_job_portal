var isValid = function(s) {
    let stack=[];
    let map={
        ')':'(',
        ']':'[',
        '}':'{'
    };
    for(let char of s){
        if(char==='(' || char==='{'|| char==='['){
            stack.push(char);

        }else{
            if(stack.length === 0|| stack[stack.length-1] !== map[char]){
                return false;
            }
            stack.pop();
        }
    }
    return stack.length === 0;

};